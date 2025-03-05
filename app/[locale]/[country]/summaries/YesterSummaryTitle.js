import { getHeadline } from "@/utils/daily summary utils";
import { isToday, sub } from "date-fns";

export default function YesterdaySummaryTitle({ locale, lastSummaryDayBefore, day, setDate, dailySummaries }) {

    const yesterday = sub(new Date(day + 'UTC'), { days: 1 }).toISOString().split('T')[0];
    const yesterdaySummary = dailySummaries.find(summary => summary.date === yesterday);
    
    if (!yesterdaySummary) return <div>{yesterday}</div>

    const headline = getHeadline(yesterdaySummary, locale);
    const yesterdayString = locale == 'heb' ? 'אתמול' : 'Yesterday';
    const dateString = isToday(new Date(day + 'UTC')) ? yesterdayString : yesterday;

    return (
        <div className={`py-2 px-2 pb-4 cursor-pointer text-2xl text-blue ${locale === 'en'
            ? 'font-roboto pr-4'
            : 'frank-re pl-4'
            }`}
            onClick={() => setDate(lastSummaryDayBefore.timestamp)}>
            <span>{dateString}</span>
            <span> {locale == 'heb' ? ' ⇠ ' : ' ⇢ '}</span>
            <span>{headline}</span>
        </div>
    );
}