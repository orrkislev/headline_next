import { getAICountrySortServer, getAllCountriesLatestSummaries, getGlobalOverview } from "@/utils/database/globalData";
import GlobalPageContent from "./GlobalPageContent";
import { GlobalLdJson } from "./metadata";

export const revalidate = 900 // 15 minutes
export const dynamicParams = false

export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'heb' }
    ];
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    
    const title = locale === 'heb' ? 'סקירה גלובלית' : '🌍 Global Overview | The news as they evolve | The Hear';
    const description = locale === 'heb' 
        ? 'סקירה גלובלית של חדשות מכל העולם'
        : 'Global overview of news from around the world';
    
    return {
        title,
        description,
    };
}

export default async function GlobalPage({ params }) {
    const { locale } = await params;
    
    // Fetch data on server
    const [AICountrySort, countrySummaries, globalOverview] = await Promise.all([
        getAICountrySortServer(),
        getAllCountriesLatestSummaries(),
        getGlobalOverview()
    ]);
    
    return (
        <>
            {/* JSON-LD structured data for SEO */}
            <GlobalLdJson 
                locale={locale}
                countrySummaries={countrySummaries}
                globalOverview={globalOverview}
            />
            
            {/* Main page content */}
            <GlobalPageContent 
                locale={locale}
                AICountrySort={AICountrySort}
                countrySummaries={countrySummaries}
                globalOverview={globalOverview}
            />
        </>
    );
}