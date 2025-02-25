import { useData } from "@/components/DataManager";
import { useDate } from "@/components/TimeManager";
import { getHeadline } from "@/utils/daily summary utils";
import { isToday, sub } from "date-fns";
import { useParams } from "next/navigation";

export default function YesterdaySummaryTitle({ lastSummaryDayBefore }) {
    const { locale } = useParams()
    const day = useDate(state => state.date.toDateString());
    const setDate = useDate(state => state.setDate);
    const dailySummaries = useData(state => state.dailySummaries);
    
    if (!dailySummaries) return null;

    const yesterday = sub(new Date(day), { days: 1 }).toISOString().split('T')[0]
    const yesterdaySummary = dailySummaries.find(summary => summary.date == yesterday);


    const headline = getHeadline(yesterdaySummary, locale);
    const yesterdayString = locale == 'heb' ? 'אתמול' : 'Yesterday';
    const dateString = isToday(new Date(day)) ? yesterdayString : yesterday;

    return (
        <div className={`py-2 px-2 pb-4 cursor-pointer text-2xl text-blue ${
            locale === 'en' 
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