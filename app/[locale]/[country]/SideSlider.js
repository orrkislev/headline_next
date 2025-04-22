'use client'

import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp } from "@mui/icons-material";
import { IconButton, Slider, styled } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ResetTimerButton from "./Slider/ResetTimerButton";
import { useTime } from "@/utils/store";
import { useDaySummaries } from "@/utils/database/useSummariesManager";
import { CustomSlider_Source } from "./Source/SourceSlider";
import useMobile from "@/components/useMobile";

export default function SideSlider({ locale, country, date: pageDate }) {
    const summaries = useDaySummaries(state => state.daySummaries);
    const date = useTime(state => state.date);
    const setDate = useTime(state => state.setDate);
    const [day, setDay] = useState(date.toDateString());
    const isMobile = useMobile();

    useEffect(() => {
        if (pageDate) {
            pageDate.setHours(23, 59)
            setDate(pageDate);
        } else {
            setDate(new Date());
        }
    }, [pageDate])

    useEffect(() => {
        if (date) setDay(date.toDateString());
    }, [date])

    const minutes = date.getHours() * 60 + date.getMinutes();

    // Get current time to prevent sliding into the future
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const isToday = day === now.toDateString();

    const updateDate = (minutes) => {
        // If today, don't allow setting time in the future
        if (isToday && minutes > currentMinutes) {
            minutes = currentMinutes;
        }

        const updatedDate = new Date(day + ' ' + Math.floor(minutes / 60) + ':' + (minutes % 60));
        setDate(updatedDate);
    }

    const marks = useMemo(() => {
        const daySummaries = summaries.filter(summary => summary.timestamp.toDateString() === day);
        return daySummaries.map((summary, index) => ({
            value: summary.timestamp.getHours() * 60 + summary.timestamp.getMinutes(),
            label: null
        }));
    }, [summaries, day]);

    // Filter out future summaries if today
    const nextSummary = summaries.find(summary =>
        summary.timestamp > date &&
        (!isToday || summary.timestamp <= now)
    );
    const prevSummary = summaries.reverse().find(summary => summary.timestamp < date);


    if (isMobile) return (
        <div className={`fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200
            flex items-center justify-between py-2 px-1 gap-2`}>
            <IconButton size="small" onClick={() => nextSummary && setDate(nextSummary.timestamp)} disabled={!nextSummary}>
                <KeyboardArrowRight />
            </IconButton>
            <CustomSlider_Source orientation="horizontal" size="small"
                min={0} max={24 * 60} step={1}
                onChange={(_, value) => updateDate(value)}
                value={minutes} marks={marks}
                sx={{ height: 4 }}
            />
            <IconButton size="small" onClick={() => prevSummary && setDate(prevSummary.timestamp)} disabled={!prevSummary}>
                <KeyboardArrowLeft />
            </IconButton>
        </div>
    )

    return (
        <div className={`flex flex-col items-center justify-center ${locale === 'heb' ? 'border-r' : 'border-l'} border-gray-200 py-2 px-1 gap-2`}>
            <ResetTimerButton locale={locale} country={country} />
            <IconButton size="small" onClick={() => nextSummary && setDate(nextSummary.timestamp)} disabled={!nextSummary}>
                <KeyboardArrowUp />
            </IconButton>
            <CustomSlider_Side orientation="vertical" size="small"
                min={0} max={24 * 60} step={1}
                onChange={(_, value) => updateDate(value)}
                value={minutes} marks={marks}
                sx={{ width: 4 }}
            />
            <IconButton size="small" onClick={() => prevSummary && setDate(prevSummary.timestamp)} disabled={!prevSummary}>
                <KeyboardArrowDown />
            </IconButton>
        </div>
    );
}



export const CustomSlider_Side = styled(Slider)(({ theme }) => ({
    color: 'navy',
    '& .MuiSlider-thumb': {
        width: 10,
        height: 10,
        backgroundColor: 'black',
        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
        '&.Mui-active': {
            width: 16,
            height: 16,
        },
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: 'lightblue',
        width: '5px',
    },
    '& .MuiSlider-track': {
        backgroundColor: 'gray',
        border: 'none',
    },
    '& .MuiSlider-mark': {
        backgroundColor: 'white',
        width: '5px',
        height: '3px',
        borderRadius: 0,
        opacity: 1,
    },
}));