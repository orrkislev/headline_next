import { useData } from "@/components/DataManager";
import { usePreferences } from "@/components/PreferencesManager";
import { useDate } from "@/components/TimeManager";
import { getHeadline } from "@/utils/daily summary utils";
import { isToday, sub } from "date-fns";

export default function YesterdaySummaryTitle({ lastSummaryDayBefore }) {
    const locale = usePreferences(state => state.locale);
    const day = useDate(state => state.date.toDateString());
    const setDate = useDate(state => state.setDate);
    const dailySummaries = useData(state => state.dailySummaries);

    const yesterday = sub(new Date(day), { days: 1 }).toISOString().split('T')[0]
    const yesterdaySummary = dailySummaries.find(summary => summary.date == yesterday);

    if (!yesterdaySummary) return null;

    const headline = getHeadline(yesterdaySummary, locale);
    const yesterdayString = locale == 'heb' ? 'אתמול' : 'Yesterday';
    const dateString = isToday(new Date(day)) ? yesterdayString : yesterday;

    return (
        <div className='py-4 cursor-pointer text-xl text-blue frank-re'
            onClick={() => setDate(lastSummaryDayBefore.timestamp)}>
            <span>{dateString}</span>
            <span> {locale == 'heb' ? ' ⇠ ' : ' ⇢ '}</span>
            <span>{headline}</span>
        </div>
    );
}