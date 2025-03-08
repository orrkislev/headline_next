'use client'

import { useTime } from "@/utils/store";
import { Clock } from "@mui/x-date-pickers/TimeClock/Clock";

export default function TimeDisplay({ locale }) {
    const date = useTime(state => state.date);

    return <Clock locale={locale} date={date} />;
}