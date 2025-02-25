'use client'

import { useMemo, useState } from "react";
import SourceSlider from "./SourceSlider";
import CloseButton from "./CloseButton";
import Headline from "./Headine";
import SourceName from "./SourceName";
import { SourceFooter } from "./SourceFooter";
import { usePreferences } from "@/components/PreferencesManager";
import { getRandomTypography } from "@/utils/typography";
import Subtitle from "./Subtitle";

export default function SourceCard({ headlines, index, country}) {
    const [headline, setHeadline] = useState(headlines[0]);
    const [showSubtitle, setShowSubtitle] = useState(true);
    const font = usePreferences(state => state.font);

    const isRTL = useMemo(() => /[\u0590-\u05FF\u0600-\u06FF]/.test(headline?.headline), [headline]);

    const typography = useMemo(() => {
        if (font === 'random') return getRandomTypography(country);
        if (font.direction === 'rtl' && !isRTL) return getRandomTypography('default');
        return font;
    }, [font, country, isRTL]);

    const subtitle = headline?.subtitle;


    return (
        <div className={`source-card relative bg-neutral-100 hover:bg-white hover:shadow-xl transition-colors duration-200 ${index == 0 ? 'col-span-2' : ''} ${isRTL ? 'direction-rtl' : 'direction-ltr'}`}>
            <CloseButton sourceName={headlines[0].website_id} />
            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col gap-4 mb-4 p-4">
                    <SourceName website={headlines[0].website_id} typography={typography} />
                    <Headline headline={headline} typography={typography} />
                </div>
                <div>
                    <Subtitle subtitle={subtitle} showSubtitle={showSubtitle} />
                    <SourceSlider headlines={headlines} setHeadline={setHeadline} />
                    <SourceFooter setShowSubtitle={setShowSubtitle} showSubtitle={showSubtitle} url={headlines[0].link} headline={headline} />
                </div>
            </div>
        </div>
    );
}