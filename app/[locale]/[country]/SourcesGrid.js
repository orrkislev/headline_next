import SourceCard from "./Source/SourceCard";

export default function SourcesGrid({ sources, locale, date, country }) {
    return (
        <>
            {sources.map((source, i) => (
                <SourceCard
                    key={source[0]}
                    index={i}
                    name={source[0]}
                    headlines={source[1]}
                    country={country}
                    locale={locale}
                    date={date}
                />
            ))}
        </>
    );
}