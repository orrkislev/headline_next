import AddSourceButton from "./Source/AddSourceButton";
import SourceCard from "./Source/SourceCard";

export default function MainSection({ sources, country, locale }) {

    // const displaySources = Object.entries(sources).filter(([sourceName]) => websites.includes(sourceName));
    // const sortedSources = displaySources.sort((a, b) => websites.indexOf(a[0]) - websites.indexOf(b[0]));

    return (
        <div className={`custom-scrollbar h-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4`}>
            {Object.entries(sources).map(([sourceName, source]) => (
                <SourceCard
                    key={sourceName}
                    name={sourceName}
                    headlines={source}
                    country={country}
                    locale={locale}
                />
            ))}
            <AddSourceButton {...{ locale, country }} />
        </div>
    );
}