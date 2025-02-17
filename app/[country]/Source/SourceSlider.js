'use client'

import { useEffect, useMemo, useState } from "react";
import { useDate } from "../SideSlider";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Slider, styled } from "@mui/material";

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

    const goToNext = () => {
        const nextHeadlines = source.filter(({ timestamp }) => timestamp > date)
        if (nextHeadlines.length === 0) return;
        const nextHeadline = nextHeadlines.pop()
        setDate(nextHeadline.timestamp);
    }
    const goToPrev = () => {
        const prevHeadline = source.find(({ timestamp }) => timestamp < date);
        if (!prevHeadline) return;
        setDate(prevHeadline.timestamp);
    }

    return (
        <div className="flex flex-row gap-4 justify-between items-center">
            <div>
                <ArrowRightIcon size={14} color="gray" onClick={goToNext}/>
            </div>

            <Slider size="small" readOnly
                    min={0} max={24 * 60} value={minutes}
                    marks={marks}/>
            <div>
                <ArrowLeftIcon size={14} color="gray" onClick={goToPrev} />
            </div>
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
        backgroundColor: 'navy',
        width: '10px',
        height: '2px',
        marginLeft: '-3px',
        '&.MuiSlider-markActive': {
            backgroundColor: 'white',
        },
    },
}));