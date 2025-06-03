'use client'

import { useEffect, useState, useMemo } from "react";
import { IconButton, Slider, styled } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useTime } from "@/utils/store";
import { createDateString } from "@/utils/utils";
import { redirect } from "next/navigation";

export default function SourceSlider({ locale, country, headlines, pageDate }) {
    const date = useTime((state) => state.date);
    const setDate = useTime((state) => state.setDate);
    const [sliderDate, setSliderDate] = useState(new Date());

    useEffect(() => {
        if (!date) return
        const timeout = setTimeout(() => {
            setSliderDate(date);
        }, 200);
        return () => clearTimeout(timeout);
    }, [date]);

    const marks = useMemo(() => {
        const dateString = pageDate ? pageDate.toDateString() : new Date().toDateString();
        const dayHeadlines = headlines.filter(({ timestamp }) => timestamp.toDateString() === dateString);
        const newMarks = dayHeadlines.map(({ timestamp }) => timestamp.getHours() * 60 + timestamp.getMinutes());
        return newMarks.map(mark => ({ value: mark, label: null }));
    }, [headlines]);

    const minutes = sliderDate.getHours() * 60 + sliderDate.getMinutes();

    const nextHeadline = headlines.filter(({ timestamp }) => timestamp > sliderDate).pop();
    const prevHeadline = headlines.find(({ timestamp }) => timestamp < sliderDate);

    const goToHeadline = (headline) => {
        if (!headline) return;
        if (sliderDate.toDateString() === headline.timestamp.toDateString()) {
            setDate(headline.timestamp);
        } else {
            redirect(`/${locale}/${country}/${createDateString(headline.timestamp)}`);
        }
    }

    return (
        <div className="flex flex-row gap-4 justify-between items-center border-t border-b border-gray-200" dir="ltr">
            <IconButton size="small" disabled={!prevHeadline} onClick={() => goToHeadline(prevHeadline)} >
                <KeyboardArrowLeft color="gray" />
            </IconButton>

            <CustomSlider_Source
                key={marks.map(mark => mark.value).join('-')} // force re-mount when marks change
                size="small" readOnly
                min={0} max={24 * 60} value={minutes}
                marks={marks} />

            <IconButton size="small" disabled={!nextHeadline} onClick={() => goToHeadline(nextHeadline)} >
                <KeyboardArrowRight color="gray" />
            </IconButton>
        </div >
    );
}

export const CustomSlider_Source = styled(Slider)(({ theme }) => ({
    color: 'navy',
    height: 4,
    '& .MuiSlider-thumb': {
        width: 7,
        height: 7,
        backgroundColor: '#888',
        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
        '&.Mui-active': {
            width: 16,
            height: 16,
        },
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: 'lightblue',
        width: '100%',
    },
    '& .MuiSlider-track': {
        backgroundColor: '#CCC',
        border: 'none',
    },
    '& .MuiSlider-mark': {
        backgroundColor: 'white',
        width: '3px',
        height: '5px',
        borderRadius: 0,
        opacity: 1,
    },
}));