'use client'

import { Slider } from "@mui/material";
import { useMemo } from "react";
import { create } from "zustand";

export const useDate = create((set) => ({
    date: new Date(),
    setDate: (date) => set({ date }),
}));

export default function SideSlider({summaries}) {
    const minutes = useDate((state) => state.date.getHours() * 60 + state.date.getMinutes());
    const setDate = useDate((state) => state.setDate);
    const day = useDate((state) => state.date.toDateString());

    const updateDate = (minutes) => {
        const date = new Date();
        date.setHours(Math.floor(minutes / 60), minutes % 60);
        setDate(date);
    }

    const marks = useMemo(() => {
        const daySummaries = summaries.filter(summary => summary.timestamp.toDateString() === day);
        return daySummaries.map((summary, index) => ({
            value: summary.timestamp.getHours() * 60 + summary.timestamp.getMinutes(),
            label: null
        }));
    }, [summaries, day]);

    return (
        <div className="flex-[1] flex flex-col items-center justify-center">
            <Slider orientation="vertical"
                value={minutes} min={0} max={24 * 60} step={1}
                onChange={(_, value) => updateDate(value)}
                marks={marks}
            />
        </div>
    );
}