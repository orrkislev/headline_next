'use client'

import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp, PlayArrow, Pause, Speed } from "@mui/icons-material";
import { IconButton, Slider, styled } from "@mui/material";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import ResetTimerButton from "./Slider/ResetTimerButton";
import PlaySpeedPopup from "./Slider/PlaySpeedPopup";
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
    const { isMobile } = useMobile();
    const [isPlaying, setIsPlaying] = useState(false);
    const [playSpeed, setPlaySpeed] = useState(4); // Speed multiplier (1x, 2x, 4x, 8x, 16x)
    const [isSpeedPopupOpen, setIsSpeedPopupOpen] = useState(false);
    const intervalRef = useRef(null);
    
    // Force English behavior on mobile
    const effectiveLocale = isMobile ? 'en' : locale;
    
    // Only show play functionality for date pages (not live pages)
    // pageDate is undefined for live pages, and a Date object for date pages
    const isDatePage = pageDate !== undefined && pageDate !== null;

    useEffect(() => {
        if (date) setDay(date.toDateString());

    }, [date])

    useEffect(() => {
        if (pageDate) {
            const newDate = new Date(pageDate);
            newDate.setHours(16, 0, 0, 0); // Default to 16:00 for date pages
            setDate(newDate);
        } else {
            setDate(new Date())
        }
    }, [pageDate, setDate]);

        const minutes = date.getHours() * 60 + date.getMinutes();

    // Get current time to prevent sliding into the future
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const isToday = day === now.toDateString();

    const updateDate = useCallback((minutes, pausePlay = false) => {
        // If today, don't allow setting time in the future
        if (isToday && minutes > currentMinutes) {
            minutes = currentMinutes;
        }

        const updatedDate = new Date(day + ' ' + Math.floor(minutes / 60) + ':' + (minutes % 60));
        setDate(updatedDate);

        // Pause playback when manually adjusting slider
        if (pausePlay && isPlaying) {
            setIsPlaying(false);
        }
    }, [isToday, currentMinutes, day, setDate, isPlaying, setIsPlaying]);

    // Auto-play functionality
    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                const currentMinutes = date.getHours() * 60 + date.getMinutes();
                const nextMinutes = currentMinutes + playSpeed; // Advance by speed multiplier

                // If we've reached the end of the day or current time (if today), stop playing
                const now = new Date();
                const todayLimit = now.getHours() * 60 + now.getMinutes();
                if (nextMinutes >= 24 * 60 || (isToday && nextMinutes >= todayLimit)) {
                    setIsPlaying(false);
                    return;
                }

                updateDate(nextMinutes);
            }, 50); // Reduced interval for smoother animation
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying, date, isToday, playSpeed, updateDate]);

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
        <>
        <div className={`fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200
            flex items-center justify-between py-2 px-1 gap-2`}>
            <IconButton size="small" onClick={() => prevSummary && goToSummary(prevSummary)} disabled={!prevSummary}>
                <KeyboardArrowLeft />
            </IconButton>
            <CustomSlider_Source orientation="horizontal" size="small"
                min={0} max={24 * 60-1} step={1}
                onChange={(_, value) => updateDate(value, true)}
                value={minutes} marks={marks}
                sx={{ height: 4 }}
            />
            <IconButton size="small" onClick={() => nextSummary && goToSummary(nextSummary)} disabled={!nextSummary}>
                <KeyboardArrowRight />
            </IconButton>

            <ResetTimerButton locale={effectiveLocale} country={country} pageDate={pageDate} />
        </div>
        {isDatePage && (
            <PlaySpeedPopup 
                open={isSpeedPopupOpen}
                close={() => setIsSpeedPopupOpen(false)}
                playSpeed={playSpeed}
                setPlaySpeed={setPlaySpeed}
                locale={effectiveLocale}
            />
        )}
        </>
    )

    return (
        <>
        <div className={`flex flex-col items-center justify-center ${effectiveLocale === 'heb' ? 'border-r' : 'border-l'} border-gray-200 py-2 px-1 gap-2`}>
            <ResetTimerButton locale={effectiveLocale} country={country} pageDate={pageDate} />
            <IconButton size="small" onClick={() => nextSummary && goToSummary(nextSummary)} disabled={!nextSummary}>
                <KeyboardArrowUp />
            </IconButton>
            <CustomTooltip title={effectiveLocale === 'heb' ? 'חזרה בזמן' : 'Back in time'} followCursor placement={effectiveLocale === 'heb' ? 'left' : 'right'}>
                <CustomSlider_Side orientation="vertical" size="small"
                    min={0} max={24 * 60-1} step={1}
                    onChange={(_, value) => updateDate(value, true)}
                    value={minutes} marks={marks}
                    sx={{ width: 4 }}
                />
            </CustomTooltip>
            <IconButton size="small" onClick={() => prevSummary && goToSummary(prevSummary)} disabled={!prevSummary}>
                <KeyboardArrowDown />
            </IconButton>
            {isDatePage && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CustomTooltip
                        title={effectiveLocale === 'heb' ? 'נגן כותרות' : 'Autoplay the day'}
                        placement={effectiveLocale === 'heb' ? 'left' : 'right'}
                    >
                        <IconButton
                            onClick={() => setIsPlaying(!isPlaying)}
                            sx={{
                                color: '#9ca3af',
                                // padding: '4px',
                                '& .MuiSvgIcon-root': {
                                    fontSize: '18px'
                                }
                            }}
                        >
                            {isPlaying ? <Pause /> : <PlayArrow />}
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip
                        title={effectiveLocale === 'heb' ? 'מהירות ניגון' : 'autoplay playback speed'}
                        placement={effectiveLocale === 'heb' ? 'left' : 'right'}
                    >
                        <IconButton
                            onClick={() => setIsSpeedPopupOpen(true)}
                            sx={{
                                color: '#9ca3af',
                                padding: '4px',
                                '& .MuiSvgIcon-root': {
                                    fontSize: '16px'
                                }
                            }}
                        >
                            <Speed fontSize="small" />
                        </IconButton>
                    </CustomTooltip>
                </div>
            )}
        </div>
        {isDatePage && (
            <PlaySpeedPopup 
                open={isSpeedPopupOpen}
                close={() => setIsSpeedPopupOpen(false)}
                playSpeed={playSpeed}
                setPlaySpeed={setPlaySpeed}
                locale={effectiveLocale}
            />
        )}
    </>
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