'use client'

import { useEffect, useMemo, useState } from "react";
import CloseButton from "./CloseButton";
import Headline from "./Headine";
import SourceName from "./SourceName";
import { SourceFooter } from "./SourceFooter";
import { getTypographyOptions } from "@/utils/typography/typography";
import Subtitle from "./Subtitle";
import dynamic from "next/dynamic";
import { useFont, useTime, useTranslate, useActiveWebsites } from "@/utils/store";
import { checkRTL, choose } from "@/utils/utils";
import useHeadlinesManager from "@/utils/database/useHeadlinesManager";
import TranslatedLabel from "./TranslatedLabel";

const SourceSlider = dynamic(() => import('./SourceSlider'));

export default function SourceCard({ name, initialHeadlines, country, locale, data }) {
    const translate = useTranslate((state) => state.translate);
    const date = useTime((state) => state.date);
    const font = useFont((state) => state.font);
    const [headline, setHeadline] = useState(initialHeadlines[0]);
    const [translations, setTranslations] = useState({});
    const websites = useActiveWebsites(state => state.activeWebsites)
    const headlines = useHeadlinesManager(country, name, initialHeadlines, websites.includes(name));

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
                    body: JSON.stringify({ headline: headline.headline, subtitle: headline.subtitle, locale }),
                    headers: { 'Content-Type': 'application/json' }
                })
                const resData = await res.json()
                setTranslations((prev) => ({ ...prev, [headline.id]: resData }))
            })();
        }
    }, [shouldTranslate, headline, name, translations]);



    let displayHeadline = { ...headline };
    let displayName = data.name
    if (shouldTranslate && translations[headline.id]) {
        displayHeadline.headline = translations[headline.id].headline;
        displayHeadline.subtitle = translations[headline.id].subtitle;
        displayName = checkRTL(translations[headline.id].headline) ? data.translations.he : data.translations.en
    } else if (shouldTranslate && !translations[headline.id]) {
        displayHeadline = {}
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
        else if (isRTL && typo.direction === 'ltr') typo = choose(getTypographyOptions('israel').options);

        if (shouldTranslate) {
            if (locale === 'heb') typo = choose(getTypographyOptions('israel').options)
            else if (locale === 'en') typo = choose(getTypographyOptions('default').options)
        }

        return typo;
    }, [font, country, isRTL, shouldTranslate, locale]);

    const isPresent = new Date() - date < 60 * 1000 * 5;

    const index = websites.indexOf(name);
    if (index == -1) return null;

    return (
        <div style={{ order: index }}
            className={`source-card
            ${index === 0 ? 'col-span-2' : 'col-span-1'}
            ${(index === 7 || index === 8) ? 'max-2xl:col-span-1 2xl:col-span-2 qhd:col-span-1' : ''}
            ${(index === 11 || index === 12 || index === 13) ? 'max-qhd:col-span-1 qhd:col-span-2' : ''}
            relative bg-neutral-100 hover:bg-white hover:shadow-xl transition-colors duration-200
            ${index == 0 ? 'col-span-2' : ''}
            ${isRTL ? 'direction-rtl' : 'direction-ltr'}
            ${!isPresent ? 'bg-neutral-50 outline outline-1 outline-neutral-300 outline-dotted' : ''}
        `}>
            <CloseButton name={name} isRTL={isRTL} />
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