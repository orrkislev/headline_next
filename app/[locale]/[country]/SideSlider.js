'use client'

import CustomTooltip from "@/components/CustomTooltip";
import { useData } from "@/components/DataManager";
import { usePreferences } from "@/components/PreferencesManager";
import TimeManager, { useDate } from "@/components/TimeManager";
import { KeyboardArrowDown, KeyboardArrowUp, Restore } from "@mui/icons-material";
import { IconButton, Slider, styled } from "@mui/material";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function SideSlider() {
    const { locale } = useParams();
    const summaries = useData((state) => state.summaries);
    const minutes = useDate((state) => state.date.getHours() * 60 + state.date.getMinutes());
    const setDate = useDate((state) => state.setDate);
    const day = useDate((state) => state.date.toDateString());

    const updateDate = (minutes) => {
        const date = new Date(day + ' ' + Math.floor(minutes / 60) + ':' + (minutes % 60));
        if (date > new Date()) setDate(new Date());
        else setDate(date);
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
            <ResetTimerButton />
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

function ResetTimerButton() {
    const { locale } = useParams()
    const isPresent = useDate((state) => state.isPresent);
    const setDate = useDate((state) => state.setDate);

    const handleReset = () => {
        setDate(new Date());
    }


    const tooltip = locale === 'heb' ? 'בחזרה לעכשיו' : 'Reset To Now';
    const placement = locale === 'heb' ? 'left' : 'right';

    return (
        <CustomTooltip title={tooltip} arrow open={!isPresent} placement={placement}>
            <IconButton
                className={`transition-colors duration-300 ${isPresent ? '' : 'animate-slow-fade'}`}
                onClick={handleReset}
                size="small"
                sx={{
                    color: isPresent ? 'lightgray' : 'blue'
                }}
            >
                <Restore fontSize="small" />
            </IconButton>
        </CustomTooltip>
    )
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