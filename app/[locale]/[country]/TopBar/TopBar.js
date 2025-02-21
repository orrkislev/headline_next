'use client'

import TimeDisplay from "./TimeDisplay.js";
import { useParams } from "next/navigation";
import { useData } from "@/components/DataManager";
import { Flag, Global, Headline, Info, SettingsButton } from "./TopBarParts.js";
import { usePreferences } from "@/components/PreferencesManager.js";


export default function TopBar() {
    const locale = usePreferences((state) => state.locale);
    const summaries = useData((state) => state.summaries);
    const { country } = useParams()

    let headline = '';
    if (summaries && summaries.length > 0) {
        const summ = summaries[0]
        headline = locale === 'heb' ? summ.hebrewHeadline : (summ.englishHeadline || summ.headline)
    }
    

    return (
        <div className="flex border-b border-gray-200 p-4">
            <div className="flex justify-between w-full">
                <div className="flex items-center divide-x-2 divide-gray-200 divide-x-reverse">
                    <TimeDisplay />
                    <Flag country={country} />
                    <Headline headline={headline} />
                </div>
                <div className='flex gap-4 items-center divide-x-2 divide-gray-200 hidden md:flex'>
                    <Global />
                    <Info />
                    <SettingsButton />
                </div>
            </div>
        </div>
    );
}

