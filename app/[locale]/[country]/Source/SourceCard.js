'use client'

import { useEffect, useMemo, useState } from "react";
import CloseButton from "./CloseButton";
import Headline from "./Headine";
import SourceName from "./SourceName";
import { SourceFooter } from "./SourceFooter";
import { getRandomTypography, getTypographyOptions } from "@/utils/typography/typography";
import Subtitle from "./Subtitle";
import dynamic from "next/dynamic";
import { useFont, useTime } from "@/utils/store";
import { choose } from "@/utils/utils";
import useWebsites from "@/utils/useWebsites";

const SourceSlider = dynamic(() => import('./SourceSlider'));

export default function SourceCard({ index, name, headlines, country }) {
    const { websites } = useWebsites(country)
    const date = useTime((state) => state.date);
    const font = useFont((state) => state.font);
    const [headline, setHeadline] = useState(headlines[0]);

    useEffect(() => {
        if (!headlines) return;
        if (!date) return;
        setHeadline(headlines.find(({ timestamp }) => timestamp < date));
    }, [headlines, date]);


    const isRTL = useMemo(() => /[\u0590-\u05FF\u0600-\u06FF]/.test(headline?.headline), [headline]);

    const typography = useMemo(() => {
        let typo = font
        if (font == 'default') typo = getTypographyOptions(country).options[0]
        else if (font == 'random') typo = choose(getTypographyOptions(country).options)
        if (typo.direction === 'rtl' && !isRTL) typo = choose(getTypographyOptions('default').options);
        return typo;
    }, [font, country, isRTL]);

    if (!websites.includes(name)) return null;
    if (!headline) return null;

    return (
        <div className={`source-card
            ${index === 0 ? 'col-span-2' : 'col-span-1'}
            ${(index === 7 || index === 8) ? 'max-2xl:col-span-1 2xl:col-span-2 qhd:col-span-1' : ''}
            ${(index === 11 || index === 12 || index === 13) ? 'max-qhd:col-span-1 qhd:col-span-2' : ''}
            relative bg-neutral-100 hover:bg-white hover:shadow-xl transition-colors duration-200
            ${index == 0 ? 'col-span-2' : ''}
            ${isRTL ? 'direction-rtl' : 'direction-ltr'}
        `}>
            {/* <CloseButton sourceName={name} activeWebsites={activeWebsites} setActiveWebsites={setActiveWebsites} /> */}
            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col gap-2 mb-2 p-4">
                    <SourceName website={name} typography={typography} country={country} />
                    <Headline headline={headline} typography={typography} />
                </div>
                <div>
                    <Subtitle subtitle={headline?.subtitle} />
                    <SourceSlider headlines={headlines} />
                    <SourceFooter url={headlines[0].link} headline={headline} headlines={headlines} />
                </div>
            </div>
        </div>
    );
}