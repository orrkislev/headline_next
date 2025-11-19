import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { fetchDailySnapshot } from "@/utils/database/fetchDailySnapshot";
import { isSameDay, isToday, parse, sub, differenceInDays } from "date-fns";
import CountryPageContent from "../CountryPage_content";
import { getWebsiteName } from "@/utils/sources/getCountryData";
import { redirect } from "next/navigation";
import { createMetadata, LdJson } from "./metadata";
import { countries } from "@/utils/sources/countries";
import ArchiveLinksData from "../TopBar/settings/ArchiveLinksData";
import CountryLinksData from "../TopBar/CountryLinksData";
import DateLinksData from "../TopBar/DateLinksData";
import { isHebrewContentAvailable } from "@/utils/daily summary utils";

// Archive pages are immutable historical content that never changes
// export const revalidate = 31536000; // 1 year in seconds
// export const dynamic = 'force-static'; // Ensure static generation

// Generate SEO metadata for a specific day
export async function generateMetadata({ params }) {
    try {
        const { country, locale, date } = await params;
        const metadata = await createMetadata({ country, locale, date });

        // Point canonical to feed version - that's the version that should be indexed
        const feedUrl = `https://www.the-hear.com/${locale}/${country}/${date}/feed`;
        metadata.alternates = {
            ...metadata.alternates,
            canonical: feedUrl
        };

        return metadata;
    } catch (error) {
        console.error('❌ [DATE-META] ERROR in generateMetadata:', error);
        throw error;
    }
}

export default async function Page({ params }) {
    try {
        // Step 1: Params
        const { country, locale, date } = await params;

        // Step 2: Date parsing (no current date comparison for static generation)
        const parsedDate = parse(date, 'dd-MM-yyyy', new Date(2000, 0, 1));
        parsedDate.setHours(12, 0, 0, 0);

        // Skip date validation for static generation - handle redirects client-side if needed
        // Archive pages are historical and won't be "today" after they're built
        if (isNaN(parsedDate.getTime())) {
            redirect(`/${locale}/${country}`);
        }

        // Per-country launch dates - reject requests for dates before data exists
        const countryLaunchDates = {
            'israel': new Date('2024-07-04'),
            'germany': new Date('2024-07-28'),
            'us': new Date('2024-07-31'),
            'italy': new Date('2024-08-28'),
            'russia': new Date('2024-08-29'),
            'iran': new Date('2024-08-29'),
            'france': new Date('2024-08-29'),
            'lebanon': new Date('2024-08-29'),
            'poland': new Date('2024-08-30'),
            'uk': new Date('2024-09-05'),
            'india': new Date('2024-09-05'),
            'ukraine': new Date('2024-09-05'),
            'spain': new Date('2024-09-05'),
            'netherlands': new Date('2024-09-05'),
            'china': new Date('2024-09-06'),
            'japan': new Date('2024-09-07'),
            'turkey': new Date('2024-09-07'),
            'uae': new Date('2024-09-08'),
            'palestine': new Date('2024-09-10'),
            'finland': new Date('2025-02-20')
        };

        // Check if date is before country launch - fail fast before expensive Firestore queries
        const launchDate = countryLaunchDates[country];
        if (launchDate && parsedDate < launchDate) {
            redirect(`/${locale}/${country}`);
        }

        // Fetch today's and yesterday's JSON in parallel for better performance
        const yesterday = sub(parsedDate, { days: 1 });
        const [todayJsonData, yesterdayData] = await Promise.all([
            fetchDailySnapshot(country, parsedDate),
            fetchDailySnapshot(country, yesterday)
        ]);

        // Use JSON if available, otherwise fallback to Firestore
        let data = todayJsonData;
        if (!data) {
            // Fallback to Firestore if JSON not available
            console.log(`[DATE-PAGE] 📊 Using Firestore for ${country} ${date}`);
            const headlines = await getCountryDayHeadlines(country, parsedDate, 2);
            const summaries = await getCountryDaySummaries(country, parsedDate, 2);
            const dailySummary = await getCountryDailySummary(country, parsedDate);
            data = { headlines, summaries, dailySummary };
        }

        console.log(`[DATE-PAGE] 📦 Data fetched - Headlines: ${data.headlines?.length || 0}, Summaries: ${data.summaries?.length || 0}`);

        if (yesterdayData) {
            console.log(`[DATE-PAGE] 📦 Yesterday's JSON loaded - Headlines: ${yesterdayData.headlines?.length || 0}, Summaries: ${yesterdayData.summaries?.length || 0}`);
            // Merge yesterday's data with today's (defensive null checks)
            data.headlines = [...(data.headlines || []), ...(yesterdayData.headlines || [])];
            data.summaries = [...(data.summaries || []), ...(yesterdayData.summaries || [])];
            console.log(`[DATE-PAGE] 📦 After merging with yesterday - Headlines: ${data.headlines.length}, Summaries: ${data.summaries.length}`);
        }

        // Only validate JSON completeness for yesterday and day-before-yesterday (today-1 and today-2)
        // Today's data is handled by live view which queries Firestore directly
        // Historical dates (today-3 and older) are immutable and complete, so no need to validate
        const daysSinceDate = differenceInDays(new Date(), parsedDate);
        const isRecentDate = daysSinceDate >= 1 && daysSinceDate <= 2;

        if (isRecentDate) {
            // Check if JSON data might be incomplete by comparing with Firestore
            // This happens when viewing a recent date from a different timezone - some data might be in the next day's JSON
            console.log(`[DATE-PAGE] 🔍 Validating recent date (${daysSinceDate} days old) - checking for incomplete data...`);

            // Fetch a sample from Firestore to compare counts
            const firestoreHeadlines = await getCountryDayHeadlines(country, parsedDate, 2);
            const firestoreSummaries = await getCountryDaySummaries(country, parsedDate, 2);

            const jsonHeadlineCount = data.headlines?.length || 0;
            const jsonSummaryCount = data.summaries?.length || 0;
            const firestoreHeadlineCount = firestoreHeadlines.length;
            const firestoreSummaryCount = firestoreSummaries.length;

            console.log(`[DATE-PAGE] 🔍 Count comparison - Headlines: JSON=${jsonHeadlineCount} vs Firestore=${firestoreHeadlineCount}, Summaries: JSON=${jsonSummaryCount} vs Firestore=${firestoreSummaryCount}`);

            // If Firestore has significantly more data (>10% difference), merge them
            const headlinesDiff = firestoreHeadlineCount - jsonHeadlineCount;
            const summariesDiff = firestoreSummaryCount - jsonSummaryCount;
            const isIncomplete = headlinesDiff > Math.max(10, jsonHeadlineCount * 0.1) || summariesDiff > Math.max(2, jsonSummaryCount * 0.1);

            if (isIncomplete) {
                console.log(`[DATE-PAGE] ⚠️ Incomplete JSON data detected (missing ${headlinesDiff} headlines, ${summariesDiff} summaries), merging with Firestore...`);

                // Merge: use JSON data + supplement with missing Firestore data
                const mergedHeadlines = [...data.headlines];
                const mergedSummaries = [...data.summaries];

                // Add missing headlines from Firestore (avoid duplicates)
                firestoreHeadlines.forEach(fh => {
                    if (!mergedHeadlines.some(h => h.id === fh.id)) {
                        mergedHeadlines.push(fh);
                    }
                });

                // Add missing summaries from Firestore (avoid duplicates)
                firestoreSummaries.forEach(fs => {
                    if (!mergedSummaries.some(s => s.id === fs.id)) {
                        mergedSummaries.push(fs);
                    }
                });

                console.log(`[DATE-PAGE] ✅ Merged data: ${jsonHeadlineCount} JSON + ${mergedHeadlines.length - jsonHeadlineCount} Firestore headlines (total: ${mergedHeadlines.length})`);
                console.log(`[DATE-PAGE] ✅ Merged data: ${jsonSummaryCount} JSON + ${mergedSummaries.length - jsonSummaryCount} Firestore summaries (total: ${mergedSummaries.length})`);

                data = {
                    headlines: mergedHeadlines.sort((a, b) => b.timestamp - a.timestamp),
                    summaries: mergedSummaries.sort((a, b) => b.timestamp - a.timestamp),
                    dailySummary: data.dailySummary // Keep daily summary from JSON
                };
            } else {
                console.log(`[DATE-PAGE] ✅ JSON data is complete, using JSON only`);
            }
        } else {
            // Historical dates are immutable and complete - skip Firestore validation entirely
            console.log(`[DATE-PAGE] ✅ Using JSON only for historical date (${daysSinceDate} days old) - skipping Firestore validation`);
        }

        const headlines = data.headlines;
        const initialSummaries = data.summaries;
        const daySummary = data.dailySummary;
        // Use yesterday's daily summary from JSON if available (saves 1 Firestore read)
        // Only query Firestore if yesterdayData doesn't exist at all (not if it exists but dailySummary is missing)
        const yesterdaySummary = yesterdayData?.dailySummary ?? (yesterdayData ? null : await getCountryDailySummary(country, sub(parsedDate, { days: 1 })));

        // Check if Hebrew content is available for Hebrew locale
        if (locale === 'heb') {
            const hasHebrewContent = initialSummaries.some(summary => isHebrewContentAvailable(summary)) ||
                (daySummary && isHebrewContentAvailable(daySummary)) ||
                (yesterdaySummary && isHebrewContentAvailable(yesterdaySummary));

            // If no Hebrew content is available, redirect to English
            if (!hasHebrewContent) {
                redirect(`/en/${country}/${date}`);
            }
        }

        const sources = {};
        headlines.forEach(headline => {
            const sourceName = getWebsiteName(country, headline.website_id);
            if (!sources[sourceName]) sources[sourceName] = { headlines: [], website_id: headline.website_id };
            sources[sourceName].headlines.push(headline);
        });


        return (
            <>
                {/* This correctly handles all your SEO needs for the entire collection */}
                <LdJson {...{ country, locale, daySummary, headlines, initialSummaries, sources }} date={parsedDate} />

                {/* Navigation links for crawlers */}
                <ArchiveLinksData locale={locale} country={country} />
                <CountryLinksData locale={locale} currentCountry={country} />
                <DateLinksData locale={locale} country={country} currentDate={parsedDate} />

                {/* This is the interactive UI for your users */}
                <CountryPageContent
                    {...{
                        sources,
                        initialSummaries,
                        daySummary,
                        yesterdaySummary,
                        locale,
                        country,
                        pageDate: parsedDate
                    }}
                />
            </>
        );
    } catch (error) {
        console.error('❌ [DATE-PAGE] FATAL ERROR:', error);
        return <div>ERROR: {error.message}</div>;
    }
}
