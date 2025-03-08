'use client'

import { getHeadline } from "@/utils/daily summary utils";
import { useTime } from "@/utils/store";
import { Skeleton } from "@mui/material";
import { isToday, sub } from "date-fns";

export default function YesterdaySummaryTitle({ locale, summary, day, dailySummaries }) {
    const setDate = useTime(state => state.setDate);

    const yesterday = sub(new Date(day + 'UTC'), { days: 1 }).toISOString().split('T')[0];
    const yesterdaySummary = dailySummaries.find(summary => summary.date === yesterday);

    let headline = <Skeleton variant="text" width={200} />;
    if (yesterdaySummary) headline = getHeadline(yesterdaySummary, locale);

    const yesterdayString = locale == 'heb' ? 'אתמול' : 'Yesterday';
    const dateString = isToday(new Date(day + 'UTC')) ? yesterdayString : yesterday;

    const click = () => {
        if (summary) setDate(summary.timestamp);
        else {
            const yesterdayDate = new Date(yesterday + 'UTC');
            yesterdayDate.setHours(23, 59);
            setDate(yesterdayDate);
        }
    }

    return (
        <div className={`py-2 px-2 pb-4 cursor-pointer text-2xl text-blue ${locale === 'en'
            ? 'font-roboto pr-4'
            : 'frank-re pl-4'
            }`}
            onClick={click}>

            <span>{dateString}</span>
            <span> {locale == 'heb' ? ' ⇠ ' : ' ⇢ '}</span>
            <span>{headline}</span>
        </div>
    );
}