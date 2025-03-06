import AddSourceButton from "./Source/AddSourceButton";
import SourceCard from "./Source/SourceCard";

export default function MainSection({ sources, country, locale, websites }) {

    const displaySources = Object.entries(sources).filter(([sourceName]) => websites.includes(sourceName));
    const sortedSources = displaySources.sort((a, b) => websites.indexOf(a[0]) - websites.indexOf(b[0]));

    return (
        <div className={`custom-scrollbar h-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4`}>
            {sortedSources.map((source, i) => (
                <SourceCard
                    key={source[0]}
                    index={i}
                    name={source[0]}
                    headlines={source[1]}
                    country={country}
                />
            ))}
            <AddSourceButton {...{locale, country, websites }} />
        </div>
    );
}