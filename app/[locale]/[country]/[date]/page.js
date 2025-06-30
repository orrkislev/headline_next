import { getCountryDailySummary, getCountryDayHeadlines, getCountryDaySummaries } from "@/utils/database/countryData";
import { isSameDay, isToday, parse, sub } from "date-fns";
import CountryPageContent from "../CountryPage_content";
import { getWebsiteName } from "@/utils/sources/getCountryData";
import { redirect } from "next/navigation";
import { createMetadata, LdJson } from "./metadata";
import { countries } from "@/utils/sources/countries";

// Server-side headline links for SEO
function ServerHeadlineLinks({ headlines, locale, country, date }) {
    if (!headlines || headlines.length === 0) return null;
    
    return (
        <div style={{ display: 'none' }}>
            {/* Hidden server-rendered links for crawlers */}
            {headlines.map((headline) => (
                <a 
                    key={headline.id}
                    href={headline.link}
                    rel="noopener noreferrer"
                    aria-hidden="true"
                >
                    {headline.headline}
                </a>
            ))}
        </div>
    );
}

// Server-side date navigation for SEO
function ServerDateNavigation({ locale, country, date }) {
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const today = new Date();
    
    function createDateString(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    
    return (
        <div style={{ display: 'none' }}>
            {/* Hidden server-rendered date navigation for crawlers */}
            <a 
                href={`https://www.the-hear.com/${locale}/${country}/${createDateString(yesterday)}`}
                aria-hidden="true"
            >
                Previous day: {createDateString(yesterday)}
            </a>
            
            {tomorrow <= today && (
                <a 
                    href={`https://www.the-hear.com/${locale}/${country}/${createDateString(tomorrow)}`}
                    aria-hidden="true"
                >
                    Next day: {createDateString(tomorrow)}
                </a>
            )}
            
            <a 
                href={`https://www.the-hear.com/${locale}/${country}`}
                aria-hidden="true"
            >
                Back to current: {country}
            </a>
        </div>
    );
}

export const revalidate = false; // generate once, never revalidate
export const dynamicParams = true; // allow on-demand generation

export async function generateStaticParams() {
    return []; // don't prebuild any paths
}

// Generate SEO metadata for a specific day
export async function generateMetadata({ params }) {
    return createMetadata(params);
}

export default async function Page({ params }) {
    const { country, locale, date } = await params;

    const parsedDate = parse(date, 'dd-MM-yyyy', new Date());
    const timezone = countries[country]?.timezone || 'UTC';
    const todayInTimezone = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
    if (isSameDay(parsedDate, todayInTimezone) || parsedDate > new Date() || isNaN(parsedDate.getTime()))
        redirect(`/${locale}/${country}`);

    const headlines = await getCountryDayHeadlines(country, parsedDate, 2);
    const initialSummaries = await getCountryDaySummaries(country, parsedDate, 2);
    const daySummary = await getCountryDailySummary(country, parsedDate)
    const yesterdaySummary = await getCountryDailySummary(country, sub(parsedDate, { days: 1 }))

    const sources = {};
    headlines.forEach(headline => {
        const sourceName = getWebsiteName(country, headline.website_id);
        if (!sources[sourceName]) sources[sourceName] = { headlines: [], website_id: headline.website_id };
        sources[sourceName].headlines.push(headline);
    });

    return <>
        <LdJson {...{ country, locale, daySummary }} date={parsedDate} />
        
        {/* Server-rendered headline links for SEO crawlers */}
        <ServerHeadlineLinks headlines={headlines} locale={locale} country={country} date={parsedDate} />
        
        {/* Server-rendered date navigation for SEO crawlers */}
        <ServerDateNavigation locale={locale} country={country} date={parsedDate} />
        
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
}
