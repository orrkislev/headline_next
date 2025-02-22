'use client'

import { useData } from "@/components/DataManager";
import { usePreferences } from "@/components/PreferencesManager";
import { useDate } from "@/components/TimeManager";
import { useEffect, useRef, useState } from "react";

export function TopBarHeadline() {
    const [headline, setHeadline] = useState('');

    return (
        <div className="h-full px-4 text-3xl" style={{ fontFamily: 'var(--font-frank-re)' }} >
            <HeadlineTimeManager setHeadline={setHeadline} />
            {headline}
        </div>
    );
}

function HeadlineTimeManager({ setHeadline }) {
    const minutes = useDate(state => state.date.getHours() * 60 + state.date.getMinutes());
    const day = useDate(state => state.date.toDateString());
    const summaries = useData(state => state.summaries);
    const locale = usePreferences(state => state.locale);
    const [headlines, setHeadlines] = useState([]);
    const currentHeadline = useRef(null)

    useEffect(() => {
        const todaySummaries = summaries.filter(headline => headline.timestamp.toDateString() === day);
        const headlines = todaySummaries.map(summary => ({
            time: summary.timestamp.getHours() * 60 + summary.timestamp.getMinutes(),
            headline: locale === 'heb' ? summary.hebrewHeadline : (summary.englishHeadline || summary.headline)
        }));
        headlines.sort((a, b) => b.time - a.time);
        setHeadlines(headlines);
    }, [day, summaries, locale]);

    useEffect(() => {
        const newHeadline = headlines.find(item => item.time < minutes);
        if (newHeadline && newHeadline !== currentHeadline.current) {
            currentHeadline.current = newHeadline;
            setHeadline(newHeadline.headline);
        }
    }, [headlines, minutes]);

    return null;
}