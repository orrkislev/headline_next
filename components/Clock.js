'use client'

import { useEffect, useState } from "react";

export default function Clock({locale, date}) {
    const [displayDate, setDisplayDate] = useState(date);

    useEffect(()=>{
        if (date) setDisplayDate(date);
        else {
            setDisplayDate(new Date());
            const interval = setInterval(() => {
                setDisplayDate(new Date());
            }, 60000);
            return () => clearInterval(interval);
        }
    }, [date]);

    if (!displayDate) return null;

    const isPresent = Math.abs(new Date() - displayDate) < 300000;

    const hours = displayDate.getHours();
    const minutes = displayDate.getMinutes();

    const paddingClass = locale === 'heb' ? 'pr-3' : 'pl-0';
    const blinkClass = isPresent ? 'timer-blink' : '';
    const notPresentClass = !isPresent ? 'text-gray-600 underline underline-offset-4 font-medium' : '';

    return (
        <div className={`h-full flex items-center justify-center font-mono text-sm direction-ltr ${paddingClass} ${notPresentClass}`}>
            <span>{hours.toString().padStart(2, '0')}</span>
            <span className={blinkClass}>:</span>
            <span>{minutes.toString().padStart(2, '0')}</span>
        </div>
    )
}