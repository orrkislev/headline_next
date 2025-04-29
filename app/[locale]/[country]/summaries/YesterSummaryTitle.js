'use client'

import InnerLink from "@/components/InnerLink";
import { getHeadline } from "@/utils/daily summary utils";
import { useTime } from "@/utils/store";
import { Skeleton } from "@mui/material";
import { isToday, sub } from "date-fns";
import { createDateString } from '@/utils/utils';

export default function YesterdaySummaryTitle({ locale, country, summary, day, initialDailySummaries }) {
    const setDate = useTime(state => state.setDate);

    const yesterday = sub(new Date(day + 'UTC'), { days: 1 }).toISOString().split('T')[0];
    const yesterdaySummary = initialDailySummaries.find(summary => summary.date === yesterday);

    let headline = <Skeleton variant="text" width={200} />;
    if (yesterdaySummary) headline = getHeadline(yesterdaySummary, locale);

    const yesterdayString = locale == 'heb' ? 'אתמול' : 'Yesterday';
    const dateString = isToday(new Date(day + 'UTC'))
        ? yesterdayString
        : <span className="font-['GeistMono']">{new Date(yesterday + 'UTC').toLocaleDateString('en-GB').replace(/\//g, '.')}</span>;

    const yesterdayDate = new Date(yesterday + 'UTC');
    yesterdayDate.setHours(23, 59);

    return (
        <InnerLink href={`/${locale}/${country}/${createDateString(yesterdayDate)}`}>
            <h2 className={`hidden sm:block py-2 px-2 pb-4 cursor-pointer ${locale === 'heb' ? 'text-lg' : 'text-base'} text-blue ${locale === 'en'
                ? 'font-["Geist"] pr-4 font-medium'
                : 'frank-re pl-4'
                }`}
                style={{ lineHeight: '1.4em', borderBottom: '1px solid #e5e7eb' }}>

                <span>{dateString}</span>
                <span> {locale == 'heb' ? ' ⇠ ' : ' ⇢ '}</span>
                <span>{headline}</span>
            </h2>
        </InnerLink>
    );
}