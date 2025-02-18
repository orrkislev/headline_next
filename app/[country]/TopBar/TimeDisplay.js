'use client'

import { useDate } from "@/components/PresetTimeManager";

export default function TimeDisplay() {
    const date = useDate(state => state.date);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return (
        <div className="px-4 h-full flex items-center justify-center">
            <span>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}</span>
        </div>
    );
}