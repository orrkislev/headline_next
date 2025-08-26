import { NextResponse } from 'next/server';
import { countries } from "@/utils/sources/countries";
import { updateCurrentMonthArchives } from '@/utils/storage/archiveUpdater';

// Cache to prevent excessive updates (5 minute cooldown)
const updateCache = new Map();
const COOLDOWN_PERIOD = 5 * 60 * 1000; // 5 minutes

export async function POST(request, { params }) {
    const { country } = await params;

    if (!countries[country]) {
        return NextResponse.json({ error: 'Invalid country' }, { status: 400 });
    }

    // Check cooldown period
    const lastUpdate = updateCache.get(country);
    const now = Date.now();
    
    if (lastUpdate && (now - lastUpdate) < COOLDOWN_PERIOD) {
        const remainingTime = Math.ceil((COOLDOWN_PERIOD - (now - lastUpdate)) / 1000);
        return NextResponse.json({
            message: 'Update skipped - cooldown active',
            remainingCooldown: remainingTime,
            updated: false
        });
    }

    try {
        console.log(`🔄 Archive update triggered for ${country.toUpperCase()}`);
        
        // Update current month archives
        const updated = await updateCurrentMonthArchives(country);
        
        // Set cooldown
        updateCache.set(country, now);
        
        return NextResponse.json({
            message: updated ? 'Archives updated successfully' : 'Archives already up to date',
            country,
            updated,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error(`❌ Archive update failed for ${country}:`, error);
        
        return NextResponse.json({
            error: 'Archive update failed',
            message: error.message,
            country
        }, { status: 500 });
    }
}

// Allow GET requests for testing
export async function GET(request, { params }) {
    const { country } = await params;
    
    if (!countries[country]) {
        return NextResponse.json({ error: 'Invalid country' }, { status: 400 });
    }
    
    const lastUpdate = updateCache.get(country);
    const now = Date.now();
    const remainingCooldown = lastUpdate ? Math.max(0, Math.ceil((COOLDOWN_PERIOD - (now - lastUpdate)) / 1000)) : 0;
    
    return NextResponse.json({
        country,
        lastUpdateTime: lastUpdate ? new Date(lastUpdate).toISOString() : null,
        cooldownRemaining: remainingCooldown,
        canUpdate: remainingCooldown === 0
    });
}