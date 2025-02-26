'use client'

import { useDate } from "@/components/TimeManager";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TimeDisplay() {
    const date = useDate(state => state.date);
    const isPresent = useDate(state => state.isPresent);

    const hours = date.getHours()
    const minutes = date.getMinutes()
    
    return Clock(hours, minutes, isPresent)
}

export function GlobalTimeDisplay() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    return Clock(hours, minutes, true)
}

function Clock(hours, minutes, isPresent) {
    const { locale } = useParams();
    const [colon, setColon] = useState(true);

    useEffect(() => {
        if (isPresent) {
            const interval = setInterval(() => {
                setColon((prev) => !prev);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setColon(true);
        }
    }, [isPresent])

    const paddingClass = locale === 'heb' ? 'pr-3' : 'pl-3';

    return (
        <div className={`h-full flex items-center justify-center font-mono text-base direction-ltr ${paddingClass}`}>
            <span>{hours.toString().padStart(2, '0')}</span>
            <span>{colon ? ':' : '\u00A0'}</span>
            <span>{minutes.toString().padStart(2, '0')}</span>
        </div>
    )
}