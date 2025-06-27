'use client'

import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp } from "@mui/icons-material";
import { IconButton, Slider, styled } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ResetTimerButton from "./Slider/ResetTimerButton";
import { useTime } from "@/utils/store";
import { useDaySummaries } from "@/utils/database/useSummariesManager";
import { CustomSlider_Source } from "./Source/SourceSlider";
import useMobile from "@/components/useMobile";
import { redirect } from "next/navigation";
import { createDateString } from "@/utils/utils";
import CustomTooltip from "@/components/CustomTooltip";

export default function SideSlider({ locale, country, pageDate }) {
    const summaries = useDaySummaries(state => state.daySummaries);
    const date = useTime(state => state.date);
    const setDate = useTime(state => state.setDate);
    const [day, setDay] = useState(date.toDateString());
    const isMobile = useMobile();

    useEffect(() => {
        if (date) setDay(date.toDateString());

    }, [date])

    useEffect(() => {
        if (pageDate) {
            const newDate = new Date(pageDate);
            newDate.setHours(23, 59, 0, 0);
            setDate(newDate);
        } else {
            setDate(new Date())
        }
    }, [pageDate]);

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
    const nextSummary = summaries.findLast(summary =>
        summary.timestamp > date &&
        (!isToday || summary.timestamp <= now)
    );
    const prevSummary = summaries.find(summary => summary.timestamp < date);

    const goToSummary = (summary => {
        if (!summary) return;
        setDate(summary.timestamp);
        if (date.toDateString() === summary.timestamp.toDateString()) {
            setDate(summary.timestamp);
        } else {
            redirect(`/${locale}/${country}/${createDateString(summary.timestamp)}`);
        }
    })

    if (isMobile) return (
        <div className={`fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200
            flex items-center justify-between py-2 px-1 gap-2`}>
            <IconButton size="small" onClick={() => nextSummary && goToSummary(nextSummary)} disabled={!nextSummary}>
                <KeyboardArrowRight />
            </IconButton>
            <CustomSlider_Source orientation="horizontal" size="small"
                min={0} max={24 * 60-1} step={1}
                onChange={(_, value) => updateDate(value)}
                value={minutes} marks={marks}
                sx={{ height: 4 }}
            />
            <IconButton size="small" onClick={() => prevSummary && goToSummary(prevSummary)} disabled={!prevSummary}>
                <KeyboardArrowLeft />
            </IconButton>
        </div>
    )

    return (
        <div className={`flex flex-col items-center justify-center ${locale === 'heb' ? 'border-r' : 'border-l'} border-gray-200 py-2 px-1 gap-2`}>
            <ResetTimerButton locale={locale} country={country} pageDate={pageDate} />
            <IconButton size="small" onClick={() => nextSummary && goToSummary(nextSummary)} disabled={!nextSummary}>
                <KeyboardArrowUp />
            </IconButton>
            <CustomTooltip title={locale === 'heb' ? 'חזרה בזמן' : 'Back in time'} followCursor placement={locale === 'heb' ? 'left' : 'right'}>
                <CustomSlider_Side orientation="vertical" size="small"
                    min={0} max={24 * 60-1} step={1}
                    onChange={(_, value) => updateDate(value)}
                    value={minutes} marks={marks}
                    sx={{ width: 4 }}
                />
            </CustomTooltip>
            <IconButton size="small" onClick={() => prevSummary && goToSummary(prevSummary)} disabled={!prevSummary}>
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