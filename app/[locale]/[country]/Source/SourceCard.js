import { useMemo } from "react";
// import CloseButton from "./CloseButton";
import Headline from "./Headine";
import SourceName from "./SourceName";
import { SourceFooter } from "./SourceFooter";
import { getRandomTypography } from "@/utils/typography/typography";
import Subtitle from "./Subtitle";
import dynamic from "next/dynamic";

const SourceSlider = dynamic(() => import('./SourceSlider'));

export default function SourceCard({ index, name, headlines, country, locale, date, setDate, font, activeWebsites, setActiveWebsites }) {
    const headline = useMemo(() => {
        if (!headlines) return null;
        if (!date) return headlines[0];
        return headlines.find(({ timestamp }) => timestamp < date);
    }, [headlines, date]);

    const subtitle = useMemo(() =>
        headline?.subtitle,
        [headline]);

    const isRTL = useMemo(() => /[\u0590-\u05FF\u0600-\u06FF]/.test(headline?.headline), [headline]);

    const typography = useMemo(() => {
        if (font.direction === 'rtl' && !isRTL) return getRandomTypography('default');
        return font;
    }, [font, isRTL]);

    if (!headline) return null;


    return (
        <div className={`
            ${index === 0 ? 'col-span-2' : 'col-span-1'}
            ${(index === 7 || index === 8) ? 'max-2xl:col-span-1 2xl:col-span-2 qhd:col-span-1' : ''}
            ${(index === 11 || index === 12 || index === 13) ? 'max-qhd:col-span-1 qhd:col-span-2' : ''}
            relative bg-neutral-100 hover:bg-white hover:shadow-xl transition-colors duration-200
            ${index == 0 ? 'col-span-2' : ''}
            ${isRTL ? 'direction-rtl' : 'direction-ltr'}
        `}>
            {/* <CloseButton sourceName={name} activeWebsites={activeWebsites} setActiveWebsites={setActiveWebsites} /> */}
            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col gap-4 mb-4 p-4">
                    <SourceName website={name} typography={typography} country={country} />
                    <Headline headline={headline} typography={typography} />
                </div>
                <div>
                    <Subtitle subtitle={subtitle} />
                    <SourceSlider headlines={headlines} date={date} setDate={setDate}/>
                    <SourceFooter url={headlines[0].link} headline={headline} />
                </div>
            </div>
        </div>
    );
}