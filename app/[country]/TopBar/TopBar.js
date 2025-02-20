'use client'

import TimeDisplay from "./TimeDisplay";
import { useParams } from "next/navigation";
import { useData } from "@/components/DataManager";
import { Flag, Global, Headline, Info, Settings } from "./TopBarParts";

export default function TopBar() {
    const summaries = useData((state) => state.summaries);
    const { country } = useParams()

    let headline = '';
    if (summaries && summaries.length > 0) {
        headline = summaries[0].headline || summaries[0].englishHeadline || summaries[0].hebrewHeadline;
    }
    

    return (
        <div className="flex gap-4 border-b border-gray-200 p-4">
            <div className="flex justify-between w-full">
                <div className="flex gap-4 items-center divide-x-2 divide-gray-200 divide-x-reverse">
                    <TimeDisplay />
                    <Flag country={country} />
                    <Headline headline={headline} />
                </div>
                <div className="flex gap-4 items-center divide-x-2 divide-gray-200">
                    <Global />
                    <Info />
                    <Settings />
                </div>
            </div>
        </div>
    );
}

