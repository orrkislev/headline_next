'use client'

import { useMemo, useState } from "react";
import SourceSlider from "./SourceSlider";
import CloseButton from "./CloseButton";
import Headline from "./Headine";
import SourceName from "./SourceName";
import { useParams } from "next/navigation";
import { getTypography } from "@/utils/typography";
import { Collapse } from "@mui/material";
import { SourceFooter } from "./SourceFooter";


export default function SourceCard({ headlines, index }) {
    const [headline, setHeadline] = useState();
    const [showSubtitle, setShowSubtitle] = useState(true);
    const { country } = useParams();

    const typography = useMemo(() => getTypography(country), [country]);
    const subtitle = headline?.subtitle;

    return (
        <div className={`source-card relative bg-neutral-100 hover:bg-white transition-colors duration-200 ${index == 0 ? 'col-span-2' : ''}`}>
            <CloseButton sourceName={headlines[0].website_id} />
            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col gap-4 mb-4 p-4">
                    <SourceName website={headlines[0].website_id} typography={typography} />
                    <Headline headline={headline} typography={typography} />
                </div>
                <div>
                    <Collapse in={showSubtitle} timeout="auto" unmountOnExit>
                        <div className="p-2 text-sm">
                            {subtitle}
                        </div>
                    </Collapse>
                    <SourceSlider source={headlines} setHeadline={setHeadline} />
                    <SourceFooter setShowSubtitle={setShowSubtitle} showSubtitle={showSubtitle} url={headlines[0].link} headline={headline} />
                </div>
            </div>
        </div>
    );
}