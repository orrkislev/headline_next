'use client'

import { useData } from "@/components/DataManager";
import { useDate } from "@/components/TimeManager";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function TopBarHeadline() {
    const [headline, setHeadline] = useState('');
    const { locale } = useParams();
    
    // Use Roboto font for English locale, default font for others
    const fontFamily = locale === 'en' ? 'var(--font-roboto)' : 'var(--font-frank-re)';

    return (
        <div className="h-full px-4 text-3xl" style={{ fontFamily }} >
            <HeadlineTimeManager setHeadline={setHeadline} />
            {/* {headline} */}
        </div>
    );
}

function HeadlineTimeManager({ setHeadline }) {
    const { locale } = useParams()
    const minutes = useDate(state => state.date.getHours() * 60 + state.date.getMinutes());
    const day = useDate(state => state.date.toDateString());
    const summaries = useData(state => state.summaries);
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