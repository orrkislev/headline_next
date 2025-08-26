import { NextRequest, NextResponse } from 'next/server';
import { countries } from "@/utils/sources/countries";
import { downloadArchiveFile } from '@/utils/storage/firebaseStorage';

// In-memory cache for JSON data
const jsonCache = new Map();
const CACHE_TTL = 4 * 60 * 60 * 1000; // 4 hours

// Load search data from monthly JSON files - supports unified search across all types
async function loadMonthlySearchData(country, collectionNames, startDate, endDate, specificMonths) {
    let monthsToLoad;
    
    // Use specific months if provided, otherwise use date range
    if (specificMonths) {
        monthsToLoad = specificMonths.split(',').map(m => m.trim());
    } else {
        monthsToLoad = getMonthsInRange(startDate, endDate);
    }
    
    let allDocs = [];
    
    // Support both single collection name (string) and multiple (array)
    const collections = Array.isArray(collectionNames) ? collectionNames : [collectionNames];
    
    console.log(`Loading ${monthsToLoad.length} months for ${country}/${collections.join(',')}: ${monthsToLoad.join(', ')}`);
    
    for (const monthKey of monthsToLoad) {
        for (const collectionName of collections) {
            const cacheKey = `${country}-${collectionName}-${monthKey}`;
            const cached = jsonCache.get(cacheKey);
            
            let monthDocs;
            if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
                monthDocs = cached.data;
            } else {
                try {
                    // Download from Firebase Storage instead of local files
                    monthDocs = await downloadArchiveFile(country, monthKey, collectionName);
                    
                    if (monthDocs) {
                        // Cache the data
                        jsonCache.set(cacheKey, {
                            data: monthDocs,
                            timestamp: Date.now()
                        });
                        
                        console.log(`Downloaded ${monthDocs.length} docs from Firebase Storage: ${collectionName}/${monthKey}`);
                    }
                } catch (error) {
                    console.log(`No data for ${collectionName}/${monthKey}: ${error.message}`);
                    continue; // Skip missing months/collections
                }
            }
            
            // Skip if no data was loaded
            if (!monthDocs || monthDocs.length === 0) {
                continue;
            }
            
            allDocs = allDocs.concat(monthDocs);
        }
    }
    
    return allDocs;
}

// Get list of month keys (YYYY-MM) between start and end dates
function getMonthsInRange(startDate, endDate) {
    const months = [];
    
    // If no dates provided, default to recent 2 months for fast performance
    if (!startDate && !endDate) {
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthKey = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
        
        return [currentMonth, lastMonthKey];
    }
    
    // Parse dates
    const start = startDate ? new Date(startDate + 'T00:00:00Z') : new Date('2024-01-01');
    const end = endDate ? new Date(endDate + 'T23:59:59Z') : new Date();
    
    // Generate month keys
    let current = new Date(start.getFullYear(), start.getMonth(), 1);
    const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
    
    while (current <= endMonth) {
        const monthKey = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
        months.push(monthKey);
        current.setMonth(current.getMonth() + 1);
    }
    
    return months;
}

// Client-side search with comprehensive text matching across all content types
function searchDocuments(docs, searchTerm, startDate, endDate, contentTypes) {
    const searchLower = searchTerm.toLowerCase();
    
    return docs.filter(doc => {
        // Content type filtering
        if (contentTypes && contentTypes.length > 0) {
            // Handle both 'dailysummaries' and 'daily' types for daily overviews
            const docType = doc.type === 'daily' ? 'dailysummaries' : doc.type;
            if (!contentTypes.includes(docType)) {
                return false;
            }
        }
        
        // Determine search fields based on document type
        let searchFields = [];
        
        switch (doc.type) {
            case 'headlines':
                searchFields = ['headline', 'subtitle'];
                break;
            case 'summaries':
                searchFields = ['summary', 'englishHeadline', 'hebrewHeadline', 'translatedHeadline'];
                break;
            case 'dailysummaries':
                searchFields = ['summaryEnglish', 'summaryHebrew', 'headline', 'headlineLocal', 'headlineHebrew'];
                break;
            default:
                searchFields = ['headline', 'summary']; // fallback
        }
        
        // Text matching - search across relevant fields for this document type
        let hasTextMatch = false;
        for (const field of searchFields) {
            const fieldValue = doc[field];
            if (fieldValue && typeof fieldValue === 'string' && 
                fieldValue.toLowerCase().includes(searchLower)) {
                hasTextMatch = true;
                break;
            }
        }
        
        if (!hasTextMatch) return false;
        
        // Date filtering (additional filtering if needed)
        if (startDate || endDate) {
            const docDate = doc.timestamp ? new Date(doc.timestamp) : null;
            if (!docDate) return false;
            
            if (startDate && docDate < new Date(startDate + 'T00:00:00Z')) return false;
            if (endDate && docDate > new Date(endDate + 'T23:59:59Z')) return false;
        }
        
        return true;
    });
}

export async function GET(request, { params }) {
    const { country } = await params;
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('q');
    const searchIn = searchParams.get('searchIn') || 'all'; // Default to unified search
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const months = searchParams.get('months'); // Specific months list
    const types = searchParams.get('types'); // Content type filter
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;

    if (!searchTerm || searchTerm.trim().length === 0) {
        return NextResponse.json({ error: 'Search term is required' }, { status: 400 });
    }

    if (!countries[country]) {
        return NextResponse.json({ error: 'Invalid country' }, { status: 400 });
    }

    const validCollections = ['headlines', 'summaries', 'dailysummaries', 'all'];
    if (!validCollections.includes(searchIn)) {
        return NextResponse.json({ error: 'Invalid searchIn parameter' }, { status: 400 });
    }

    try {
        const searchTermTrimmed = searchTerm.trim();
        
        // Determine which collections to search
        let collectionsToSearch;
        if (searchIn === 'all') {
            collectionsToSearch = ['headlines', 'summaries']; // summaries includes dailysummaries
        } else {
            collectionsToSearch = [searchIn];
        }
        
        // Load monthly JSON data for all relevant collections
        const docs = await loadMonthlySearchData(country, collectionsToSearch, startDate, endDate, months);
        
        if (docs.length === 0) {
            return NextResponse.json({
                error: `No search data available for ${country} in the specified date range.`
            }, { status: 404 });
        }
        
        // Parse content types if provided
        const contentTypes = types ? types.split(',').map(t => t.trim()) : null;
        
        const dateRange = months ? ` (months: ${months})` : 
                          startDate || endDate ? ` (${startDate || '∞'} to ${endDate || '∞'})` : 
                          ' (recent 2 months)';
        const searchType = searchIn === 'all' ? 'all content types' : searchIn;
        const typeFilter = contentTypes ? ` [types: ${contentTypes.join(',')}]` : '';
        console.log(`Monthly search: "${searchTermTrimmed}" in ${country}/${searchType} (${docs.length} docs)${dateRange}${typeFilter}`);
        
        // Perform comprehensive unified search
        const searchResults = searchDocuments(docs, searchTermTrimmed, startDate, endDate, contentTypes);
        
        // Sort by timestamp (most recent first)
        searchResults.sort((a, b) => {
            const aTime = a.timestamp ? new Date(a.timestamp).getTime() : 0;
            const bTime = b.timestamp ? new Date(b.timestamp).getTime() : 0;
            return bTime - aTime;
        });
        
        // Calculate pagination
        const totalResults = searchResults.length;
        const totalPages = Math.ceil(totalResults / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedResults = searchResults.slice(startIndex, endIndex);
        
        console.log(`Found ${searchResults.length} matches, returning ${paginatedResults.length} (page ${page}/${totalPages})`);
        
        return NextResponse.json({
            results: paginatedResults,
            pagination: {
                page,
                limit,
                totalResults,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
                startIndex: startIndex + 1,
                endIndex: Math.min(endIndex, totalResults)
            },
            searchTerm: searchTermTrimmed,
            searchIn,
            country,
            method: 'monthly-json',
            docsScanned: docs.length,
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            ...(contentTypes && { contentTypes })
        });

    } catch (error) {
        console.error('Monthly search error:', error);
        return NextResponse.json({ 
            error: 'Search failed: ' + error.message 
        }, { status: 500 });
    }
}