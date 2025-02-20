'use client'

import { useEffect, useMemo, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { IconButton, Slider, styled } from "@mui/material";
import { useDate } from "@/components/PresetTimeManager";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

export default function SourceSlider({ source, setHeadline }) {
    const { date, setDate } = useDate()
    const day = useDate(state => state.date.toDateString());
    const [currHeadline, setCurrHeadline] = useState();
    const [marks, setMarks] = useState([]);

    useEffect(() => {
        const dayHeadlines = source.filter(({ timestamp }) => timestamp.toDateString() === day);
        const newMarks = dayHeadlines.map(({ timestamp }) => timestamp.getHours() * 60 + timestamp.getMinutes());
        setMarks(newMarks.map(mark => ({ value: mark, label: null })));
    }, [source, day])


    useEffect(() => {
        setHeadline(currHeadline);
    }, [currHeadline, setHeadline]);

    useEffect(() => {
        const headline = source.find(({ timestamp }) => timestamp < date);
        setCurrHeadline(headline);
        
    }, [date, source]);

    const website = useMemo(() => {
        return source[0].website_id;
    }, [source]);

    const minutes = date.getHours() * 60 + date.getMinutes();

    const nextHeadline = source.find(({ timestamp }) => timestamp > date);
    const prevHeadline = source.find(({ timestamp }) => timestamp < date);

    return (
        <div className="flex flex-row gap-4 justify-between items-center border-t border-b border-gray-200">
            <IconButton size="small" disabled={!nextHeadline} onClick={() => setDate(nextHeadline.timestamp)}>
                <KeyboardArrowRight color="gray" />
            </IconButton>

            {/* <CustomSlider size="small" readOnly
                min={0} max={24 * 60} value={minutes}
                marks={marks} /> */}
            <input type="range" min={0} max={24 * 60} value={minutes} className="slider" readOnly
                style={{ width: '100%' }}
                list={"tickmarks_" + website}
                onChange={e => e.preventDefault()}
            />
            <datalist id={"tickmarks_" + website}>
                {marks.map((mark, i) => (
                    <option key={i} value={mark} />
                ))}
            </datalist>
            
            <IconButton size="small" disabled={!prevHeadline} onClick={() => setDate(prevHeadline.timestamp)}>
                <KeyboardArrowLeft color="gray" />
            </IconButton>
        </div >
    );
}

{/* <input type="range" min={0} max={24 * 60} value={minutes} className="slider" readOnly
                style={{ width: '100%' }}
                list={"tickmarks_" + website}
                onChange={e => e.preventDefault()}
            />
            <datalist id={"tickmarks_" + website}>
                {marks.map((mark, i) => (
                    <option key={i} value={mark} />
                ))} */}




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