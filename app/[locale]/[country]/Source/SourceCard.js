'use client'

import { useEffect, useMemo, useRef, useState } from "react";
import CloseButton from "./CloseButton";
import Headline from "./Headine";
import SourceName from "./SourceName";
import { SourceFooter } from "./SourceFooter";
import { getRandomTypography, getTypographyOptions } from "@/utils/typography/typography";
import Subtitle from "./Subtitle";
import dynamic from "next/dynamic";
import { useFont, useTime, useTranslate } from "@/utils/store";
import { choose } from "@/utils/utils";
import useWebsites from "@/utils/useWebsites";
import useHeadlinesManager from "@/utils/database/useHeadlinesManager";
import { getSourceName } from "@/utils/sources/source mapping";

const SourceSlider = dynamic(() => import('./SourceSlider'));

export default function SourceCard({ name, initialHeadlines, country, locale }) {
    const headlines = useHeadlinesManager(country, name, initialHeadlines);
    const { websites, toggleSource, isActive } = useWebsites(country, locale)
    const translate = useTranslate((state) => state.translate);
    const date = useTime((state) => state.date);
    const font = useFont((state) => state.font);
    const [headline, setHeadline] = useState(initialHeadlines[0]);
    const [translations, setTranslations] = useState({});

    const shouldTranslate = useMemo(() => translate.includes(name) || translate.includes('ALL'), [translate, name]);

    useEffect(() => {
        if (!headlines) return;
        if (!date) return;
        setHeadline(headlines.find(({ timestamp }) => timestamp < date));
    }, [headlines, date]);

    useEffect(() => {
        if (shouldTranslate && headline && headline.headline) {
            if (!isActive(name)) return;
            if (translations[headline.id]) return;
            (async () => {
                const res = await fetch('/api/translate', {
                    method: 'POST',
                    body: JSON.stringify({ headline: headline.headline })
                })
                const resData = await res.json()
                setTranslations((prev) => ({ ...prev, [headline.id]: resData.text }))
            })();
        }
    }, [shouldTranslate, headline, isActive, name, translations]);


    const isRTL = useMemo(() => /[\u0590-\u05FF\u0600-\u06FF]/.test(headline?.headline) ||
        /[\u0590-\u05FF\u0600-\u06FF]/.test(getSourceName(country, name))
        , [headline]);

    const typography = useMemo(() => {
        let typo = font
        if (font == 'default') typo = getTypographyOptions(country).options[0]
        else if (font == 'random') typo = choose(getTypographyOptions(country).options)
        if (typo.direction === 'rtl' && !isRTL) typo = choose(getTypographyOptions('default').options);
        return typo;
    }, [font, country, isRTL]);

    if (!isActive(name)) return null;

    const index = websites.indexOf(name);

    return (
        <div style={{ order: index }}
            className={`source-card
            ${index === 0 ? 'col-span-2' : 'col-span-1'}
            ${(index === 7 || index === 8) ? 'max-2xl:col-span-1 2xl:col-span-2 qhd:col-span-1' : ''}
            ${(index === 11 || index === 12 || index === 13) ? 'max-qhd:col-span-1 qhd:col-span-2' : ''}
            relative bg-neutral-100 hover:bg-white hover:shadow-xl transition-colors duration-200
            ${index == 0 ? 'col-span-2' : ''}
            ${isRTL ? 'direction-rtl' : 'direction-ltr'}
        `}>
            <CloseButton sourceName={name} click={() => toggleSource(name)} />
            <div className="flex flex-col h-full justify-normal sm:justify-between">
                <div className="flex flex-col gap-2 mb-2 p-4">
                    <SourceName website={name} typography={typography} country={country} />
                    <Headline headline={headline} typography={typography} translation={shouldTranslate ? translations[headline.id] : null} />
                </div>
                <div>
                    <Subtitle headline={headline} />
                    <SourceSlider headlines={headlines} />
                    <SourceFooter url={headlines[0].link} {...{ headline, headlines, name }} />
                </div>
            </div>
        </div>
    );
}