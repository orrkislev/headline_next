'use client'

import { useData } from "@/components/DataManager";
import TimeManager, { useDate } from "@/components/TimeManager";
import { KeyboardArrowDown, KeyboardArrowUp, Restore } from "@mui/icons-material";
import { IconButton, Slider, styled } from "@mui/material";
import { useMemo } from "react";
import ResetTimerButton from "./Slider/ResetTimerButton";

export default function SideSlider({ summaries, locale, date, setDate }) {
    const minutes = date.getHours() * 60 + date.getMinutes();
    const day = date.toDateString();

    const updateDate = (minutes) => {
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

    const nextSummary = summaries.find(summary => summary.timestamp > useDate.getState().date);
    const prevSummary = summaries.reverse().find(summary => summary.timestamp < useDate.getState().date);

    return (
        <div className={`flex flex-col items-center justify-center ${locale === 'heb' ? 'border-r' : 'border-l'} border-gray-200 py-2 px-1 gap-2`}>
            <TimeManager />
            <ResetTimerButton date={date} setDate={setDate} locale={locale}/>
            <IconButton size="small" onClick={() => setDate(nextSummary.timestamp)} disabled={!nextSummary}>
                <KeyboardArrowUp />
            </IconButton>
            <CustomSlider orientation="vertical"
                size="small"
                value={minutes} min={0} max={24 * 60} step={1}
                onChange={(_, value) => updateDate(value)}
                marks={marks}
            />
            <IconButton size="small" onClick={() => setDate(prevSummary.timestamp)} disabled={!prevSummary}>
                <KeyboardArrowDown />
            </IconButton>
        </div>
    );
}



const CustomSlider = styled(Slider)(({ theme }) => ({
    color: 'navy',
    width: 4,
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