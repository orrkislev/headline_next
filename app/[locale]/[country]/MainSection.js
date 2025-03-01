import { useMemo } from "react";
// import AddSourceButton from "./Source/AddSourceButton";
import SourceCard from "./Source/SourceCard";
import getSourceOrder from "@/utils/sources/source orders";
import { getTypographyOptions } from "@/utils/typography/typography";

export default function MainSection({ sources, locale, country, date, setDate, activeWebsites, setActiveWebsites, order }) {

    const displaySources = useMemo(() => {
        const sourceOrder = getSourceOrder(country, order);
        const orderedSources = Object.entries(sources).sort((a, b) => sourceOrder.indexOf(a[0]) - sourceOrder.indexOf(b[0]));
        return orderedSources.filter(source => activeWebsites.includes(source[0].toLowerCase()) || activeWebsites.includes(source[0]));
    }, [sources, activeWebsites, country, order]);

    const font = useMemo(()=>{
        const typography = getTypographyOptions(country);
        return typography.options[0];
    }, [country]);


    if (displaySources.length === 0) {
        return <div className="text-center">No sources available.</div>;
    }

    return (
        <div className={`custom-scrollbar h-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4`}>
            {displaySources.map((source, i) => (
                <SourceCard
                    key={source[0]}
                    index={i}
                    name={source[0]}
                    headlines={source[1]}
                    {...{ country, locale, date, setDate, activeWebsites, setActiveWebsites, font }}
                />
            ))}
            {/* <AddSourceButton {...{ country, activeWebsites, setActiveWebsites, order }} /> */}
        </div>
    );
}