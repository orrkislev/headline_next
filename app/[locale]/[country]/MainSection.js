import AddSourceButton from "./Source/AddSourceButton";
import SourceCard from "./Source/SourceCard";

export default function MainSection({ sources, country, locale }) {
    return (
        <div className={`custom-scrollbar grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 fhd:grid-cols-4 qhd:grid-cols-6 gap-4 p-4`}>
            {Object.entries(sources).map(([sourceName, source]) => (
                <SourceCard
                    key={sourceName}
                    name={sourceName}
                    initialHeadlines={source}
                    country={country}
                    locale={locale}
                />
            ))}
            <AddSourceButton {...{ locale, country }} />
        </div>
    );
}