import getSourceOrder from "@/utils/sources/source orders";
import CountryPageContent from "./CountryPage_content";

export default function CountryPageStatic({ initialSummaries, initialSources, initialDailySummary, locale, country }) {
    // Set up static props for the content component
    const sources = initialSources;
    const summaries = initialSummaries;
    const date = new Date();
    const setDate = () => { };
    const sourceOrder = getSourceOrder(country, 'default');
    const activeWebsites = sourceOrder.slice(0, 6);
    const setActiveWebsites = () => { };
    const order = 'default';

    return (
        <div id='remove_me' className="absolute">
            <CountryPageContent
                sources={sources}
                summaries={summaries}
                locale={locale}
                country={country}
                date={date}
                setDate={setDate}
                activeWebsites={activeWebsites}
                setActiveWebsites={setActiveWebsites}
                order={order}
            />
        </div>
    );
}