'use client'

import { useEffect, useMemo, useState } from "react";
import { IconButton, Slider, styled } from "@mui/material";
import { useDate } from "@/components/PresetTimeManager";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

export default function SourceSlider({ source, setHeadline }) {
    const day = useDate(state => state.date.toDateString());
    const [marks, setMarks] = useState([]);
    const [sliderDate, setSliderDate] = useState(new Date());

    useEffect(() => {
        const dayHeadlines = source.filter(({ timestamp }) => timestamp.toDateString() === day);
        const newMarks = dayHeadlines.map(({ timestamp }) => timestamp.getHours() * 60 + timestamp.getMinutes());
        setMarks(newMarks.map(mark => ({ value: mark, label: null })));
    }, [source, day])

    const minutes = sliderDate.getHours() * 60 + sliderDate.getMinutes();

    const nextHeadline = source.find(({ timestamp }) => timestamp > sliderDate);
    const prevHeadline = source.find(({ timestamp }) => timestamp < sliderDate);

    return (
        <div className="flex flex-row gap-4 justify-between items-center border-t border-b border-gray-200">
            <SliderTimeManager source={source} setSliderDate={setSliderDate} setHeadline={setHeadline}/>
            <IconButton size="small" disabled={!nextHeadline} onClick={() => setDate(nextHeadline.timestamp)}>
                <KeyboardArrowRight color="gray" />
            </IconButton>

            <CustomSlider size="small" readOnly
                min={0} max={24 * 60} value={minutes}
                marks={marks} />

            <IconButton size="small" disabled={!prevHeadline} onClick={() => setDate(prevHeadline.timestamp)}>
                <KeyboardArrowLeft color="gray" />
            </IconButton>
        </div >
    );
}

function SliderTimeManager({source, setSliderDate, setHeadline}) {
    const { date, setDate } = useDate()

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSliderDate(date);
        }, 200);
        return () => clearTimeout(timeout);
    }, [date])

    useEffect(() => {
        const headline = source.find(({ timestamp }) => timestamp < date);
        setHeadline(headline);
    }, [date, source]);


    return null
}

const CustomSlider = styled(Slider)(({ theme }) => ({
    color: 'navy',
    height: 4,
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
        width: '100%',
    },
    '& .MuiSlider-track': {
        backgroundColor: 'gray',
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