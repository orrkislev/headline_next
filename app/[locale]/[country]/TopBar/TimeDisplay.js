'use client'

import { useDate } from "@/components/TimeManager";
import { useEffect, useState } from "react";

export default function TimeDisplay() {
    const date = useDate(state => state.date);
    const isPresent = useDate(state => state.isPresent);
    const [colon, setColon] = useState(true);

    const hours = date.getHours();
    const minutes = date.getMinutes();

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

    return (
        <div className="px-4 h-full flex items-center justify-center text-blue font-mono text-2xl direction-ltr">
            <span>{hours.toString().padStart(2, '0')}</span>
            <span>{colon ? ':' : '\u00A0'}</span>
            <span>{minutes.toString().padStart(2, '0')}</span>
        </div>
    );
}
