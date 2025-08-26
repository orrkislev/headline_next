'use client'

import { useEffect, useState } from "react";
import InnerLink from "@/components/InnerLink";
import { Skeleton } from "@mui/material";
import { sub, add } from "date-fns";
import { createDateString } from '@/utils/utils';
import useFirebase from "@/utils/database/useFirebase";
import { getHeadline } from '@/utils/daily summary utils';

function DateLink({ direction, country, targetDate, summary, locale }) {
    // Prepare headline (fallback to skeleton while loading)
    let headline = summary ? getHeadline(summary, locale) : <Skeleton variant="text" width={160} sx={{ display: 'inline-block', verticalAlign: 'middle' }} />;

    const arrow = locale === 'heb' 
        ? (direction === 'previous' ? ' ⟵ ' : ' ⟶ ') 
        : (direction === 'previous' ? ' ⟵ ' : ' ⟶ ');

    const dateString = <span className={`font-mono font-medium ${locale === 'heb' ? 'text-sm' : ''}`}>{targetDate.toLocaleDateString('en-GB').replace(/\//g, '.')}</span>;

    // Layout: both previous and next = [date][arrow][headline], but for next, arrow points right
    const flexDirection = 'flex-row';

    return (
        <InnerLink href={`/${locale}/${country}/${createDateString(targetDate)}`}>
            <h2
                className={`py-1 px-2 cursor-pointer flex items-center gap-2 text-black hover:text-blue hover:underline hover:underline-offset-4 ${locale === 'en' ? 'font-["Geist"] text-sm' : 'frank-re text-[17px] bg-white rounded-xs py-1.5'} ${locale === 'heb' ? 'flex-row-reverse' : 'flex-row'}`}
                style={{ lineHeight: '1.2em' }}
            >
                {direction === 'previous' ? (
                    <>
                        {dateString}
                        <span>{arrow}</span>
                        {headline}
                    </>
                ) : (
                    <>
                        {headline}
                        <span>{arrow}</span>
                        {dateString}
                    </>
                )}
            </h2>
        </InnerLink>
    );
}

export default function DateNavigator({ locale, country, pageDate }) {
    const firebase = useFirebase();
    const [prevSummary, setPrevSummary] = useState(null);
    const [nextSummary, setNextSummary] = useState(null);

    useEffect(() => {
        if (!pageDate || !firebase.ready) return;
        const prevDate = sub(new Date(pageDate), { days: 1 });
        const nextDate = add(new Date(pageDate), { days: 1 });

        const fetchData = async () => {
            try {
                const prev = await firebase.getCountryDailySummary(country, prevDate);
                setPrevSummary(prev);
            } catch (e) {
                console.error('Failed loading previous day summary', e);
            }
            if (nextDate <= new Date()) {
                try {
                    const next = await firebase.getCountryDailySummary(country, nextDate);
                    setNextSummary(next);
                } catch (e) {
                    console.error('Failed loading next day summary', e);
                }
            }
        };
        fetchData();
    }, [firebase, country, pageDate]);

    if (!pageDate) return null; // Should only render on date pages

    const prevDate = sub(new Date(pageDate), { days: 1 });
    const nextDate = add(new Date(pageDate), { days: 1 });

    // Calculate if this page is 'yesterday' (today minus one day)
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const isYesterdayPage = new Date(pageDate).toDateString() === yesterday.toDateString();

    return (
        <div className={`flex justify-between border-t border-gray-200 px-2 py-3 w-auto bg-white bg-opacity-85 fixed bottom-0 z-5 backdrop-blur-sm shadow ${locale === 'heb' ? 'right-0 sm:right-[45px] left-0' : 'left-0 sm:left-[45px] right-0'}`}>
            <div className={`flex justify-between w-full ${locale === 'heb' ? 'flex-row-reverse' : 'flex-row'}`}>
                <DateLink
                    direction="previous"
                    {...{ country, targetDate: prevDate, summary: prevSummary, locale }}
                />
                {/* Render next link only if it's not in the future and not on yesterday's page */}
                {nextDate <= today && !isYesterdayPage && (
                    <DateLink
                        direction="next"
                        {...{ country, targetDate: nextDate, summary: nextSummary, locale }}
                    />
                )}
            </div>
        </div>
    );
} 