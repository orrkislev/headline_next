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
import TranslatedLabel from "./TranslatedLabel";
import { getSourceData } from "@/utils/sources/getCountryData";

const SourceSlider = dynamic(() => import('./SourceSlider'));

const randomFontIndex = Math.floor(Math.random() * 100)

export default function SourceCard({ source, headlines, country, locale, isLoading, pageDate }) {
    const translate = useTranslate((state) => state.translate);
    const date = useTime((state) => state.date);
    const font = useFont((state) => state.font);
    const [headline, setHeadline] = useState(headlines[0]);
    const [translations, setTranslations] = useState({});
    const websites = useActiveWebsites(state => state.activeWebsites);
    const [isPresent, setIsPresent] = useState(true);

    const sourceData = useMemo(() => getSourceData(country, source), [country, source])

    const shouldTranslate = useMemo(() => translate.includes(source) || translate.includes('ALL'), [translate, source]);

    const randomBgOpacity = useMemo(() => {
        const opacities = ['bg-opacity-20', 'bg-opacity-30', 'bg-opacity-40', 'bg-opacity-50', 'bg-opacity-60', 'bg-opacity-70', 'bg-opacity-80', 'bg-opacity-90'];
        return opacities[Math.floor(Math.random() * opacities.length)];
    }, []);

    useEffect(() => {
        if (!headlines) return;
        if (!date) return;
        setHeadline(headlines.find(({ timestamp }) => timestamp <= date));
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
    }, [shouldTranslate, headline, source, translations]);

    useEffect(() => {
        setIsPresent(new Date() - date < 60 * 1000 * 5);
    }, [date]);

    let displayHeadline = { ...headline };
    let displayName = sourceData.name
    if (shouldTranslate && translations[headline.id]) {
        displayHeadline.headline = translations[headline.id].headline;
        displayHeadline.subtitle = translations[headline.id].subtitle;
        displayName = checkRTL(translations[headline.id].headline) ? sourceData.translations.he : sourceData.translations.en
    } else if (shouldTranslate && !translations[headline.id]) {
        displayHeadline = { headline: '', subtitle: '' }
    }


    const isRTL = useMemo(() => (
        displayHeadline.headline && checkRTL(displayHeadline.headline)) || checkRTL(displayName)
        , [displayHeadline.headline, displayName]);

    const typography = useMemo(() => {
        let typo = font
        const options = getTypographyOptions(country).options
        if (typeof font === 'number') typo = options[font % options.length]
        else if (font == 'random') typo = choose(options)

        if ((typo.direction === 'rtl' && !isRTL) || (typo.direction === 'ltr' && isRTL)) {
            const otherOptions = getTypographyOptions(isRTL ? 'israel' : 'us').options
            typo = otherOptions[randomFontIndex % otherOptions.length]
        }

        if (shouldTranslate) {
            const translatedOptions = getTypographyOptions(locale == 'heb' ? 'israel' : 'us').options
            typo = translatedOptions[randomFontIndex % translatedOptions.length]
        }

        return typo;
    }, [font, country, isRTL, shouldTranslate, locale]);

    const index = websites.length > 0 ? websites.indexOf(source) : 1
    if (index == -1) return null;



    return (
        <div style={{ order: index }}
            className={`source-card group col-span-1
            ${index === 0 ? 'col-span-2' : ''}
            ${(index === 7 || index === 8) ? 'max-xl:col-span-1 qhd:col-span-1' : ''}
            ${(index === 11 || index === 12 || index === 13) ? 'max-qhd:col-span-1 qhd:col-span-2' : ''}
            relative bg-neutral-100 hover:bg-white hover:shadow-xl transition-colors duration-200
            ${isRTL ? 'direction-rtl' : 'direction-ltr'}
            ${!isPresent ? `bg-off-white ${randomBgOpacity} outline outline-1 outline-neutral-300 outline-dotted` : ''}
            ${shouldTranslate ? 'bg-white shadow-lg border border-dotted' : ''}
        `}>
            <TranslatedLabel locale={locale} active={shouldTranslate} className="group-hover:opacity-0" />
            <CloseButton name={source} isRTL={isRTL} className="z-[2]" />
            <div className="flex flex-col h-full justify-normal sm:justify-between">
                <div className="flex flex-col gap-2 mb-2 p-4">
                    <SourceName
                        name={displayName}
                        description={sourceData.description}
                        {...{ typography, date, isLoading }}
                    />
                    <Headline headline={displayHeadline}
                        {...{ typography, isLoading }} />
                </div>
                <div>
                    <Subtitle headlineData={displayHeadline} {...{ isLoading }} />
                    <SourceSlider {...{ locale, country, headlines, pageDate }} />
                    <SourceFooter url={headlines[0].link} {...{ headline, headlines, source }} />
                </div>
            </div>
        </div>
    );
}