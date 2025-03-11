'use client'

import { useEffect, useMemo, useState } from "react";
import CloseButton from "./CloseButton";
import Headline from "./Headine";
import SourceName from "./SourceName";
import { SourceFooter } from "./SourceFooter";
import { getTypographyOptions } from "@/utils/typography/typography";
import Subtitle from "./Subtitle";
import dynamic from "next/dynamic";
import { useFont, useTime, useTranslate } from "@/utils/store";
import { checkRTL, choose } from "@/utils/utils";
import useWebsites from "@/utils/useWebsites";
import useHeadlinesManager from "@/utils/database/useHeadlinesManager";
import TranslatedLabel from "./TranslatedLabel";

const SourceSlider = dynamic(() => import('./SourceSlider'));

export default function SourceCard({ name, initialHeadlines, country, locale, data, index }) {
    const headlines = useHeadlinesManager(country, name, initialHeadlines);
    const { toggleSource } = useWebsites(country, locale)
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
            if (translations[headline.id]) return;
            (async () => {
                const res = await fetch('/api/translate', {
                    method: 'POST',
                    body: JSON.stringify({ headline: headline.headline, subtitle: headline.subtitle, locale}),
                    headers: { 'Content-Type': 'application/json' }
                })
                const resData = await res.json()
                setTranslations((prev) => ({ ...prev, [headline.id]: resData }))
            })();
        }
    }, [shouldTranslate, headline, name, translations]);



    const displayHeadline = { ...headline };
    let displayName = data.name
    if (shouldTranslate && translations[headline.id]) {
        displayHeadline.headline = translations[headline.id].headline;
        displayHeadline.subtitle = translations[headline.id].subtitle;
        displayName = checkRTL(translations[headline.id].headline) ? data.translations.he : data.translations.en
    }


    const isRTL = useMemo(() => (
        displayHeadline.headline && checkRTL(displayHeadline.headline)) || checkRTL(displayName)
        , [displayHeadline.headline, displayName]);

    const typography = useMemo(() => {
        let typo = font
        const options = getTypographyOptions(country).options
        if (typeof font === 'number') typo = options[font % options.length]
        else if (font == 'random') typo = choose(options)
        if (typo.direction === 'rtl' && !isRTL) typo = choose(getTypographyOptions('default').options);
        return typo;
    }, [font, country, isRTL]);




    return (
        <div style={{ order: index }}
            className={`source-card
            ${index === 0 ? 'col-span-2' : 'col-span-1'}
            ${(index === 7 || index === 8) ? 'max-2xl:col-span-1 2xl:col-span-2 qhd:col-span-1' : ''}
            ${(index === 11 || index === 12 || index === 13) ? 'max-qhd:col-span-1 qhd:col-span-2' : ''}
            relative bg-neutral-100 hover:bg-white hover:shadow-xl transition-colors duration-200
            ${index == 0 ? 'col-span-2' : ''}
        `}>
            <CloseButton click={() => toggleSource(name)} isRTL={isRTL} />
            <TranslatedLabel locale={locale} active={shouldTranslate} />
            <div className="flex flex-col h-full justify-normal sm:justify-between">
                <div className="flex flex-col gap-2 mb-2 p-4">
                    <SourceName name={displayName} typography={typography} description={data.description} date={date} />
                    <Headline headline={displayHeadline} typography={typography} />
                </div>
                <div>
                    <Subtitle headlineData={displayHeadline} />
                    <SourceSlider headlines={headlines} />
                    <SourceFooter url={headlines[0].link} {...{ headline, headlines, name }} />
                </div>
            </div>
        </div>
    );
}