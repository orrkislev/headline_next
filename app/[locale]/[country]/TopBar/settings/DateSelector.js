'use client'

import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { add, sub } from "date-fns";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState, useEffect } from "react";
import { LabeledContent } from "@/components/LabeledIcon";
import { useTime } from "@/utils/store";
import { useRouter, usePathname } from "next/navigation";
import { createDateString } from '@/utils/utils';
import { LinearProgress } from "@mui/material";



export function DateSelector({ locale, country }) {
    const { date, setDate } = useTime()
    const [open, setOpen] = useState(false)
    const [isNavigating, setIsNavigating] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    // Reset loading state when pathname changes
    useEffect(() => {
        if (isNavigating) {
            setIsNavigating(false);
        }
    }, [pathname]);

    const day = date.toDateString();
    const today = new Date()
    const isToday = day == today.toDateString()

    const todayDate = new Date(day);
    const dateString = todayDate.toLocaleDateString("en-GB")
        .slice(0, 8)
        .replace(/(\d{2})$/, todayDate.getFullYear().toString().slice(2))
    // ... existing code ...
        const label = isToday ? <span className="font-geist">Today</span> : `${Math.floor((today - todayDate) / (1000 * 60 * 60 * 24))} days ago`;

    const yesterday = sub(todayDate, { days: 1 });
    const tomorrow = isToday ? null : add(todayDate, { days: 1 });

    const setDay = (newDate) => {
        setIsNavigating(true);
        router.push(`/${locale}/${country}/${createDateString(newDate)}`);
        // if (newDate) {
        //     newDate.setHours(date.getHours(), date.getMinutes())
        //     setDate(newDate);
        // }
    }

    return (
        <>
            {isNavigating && (
                <div className="fixed top-0 left-0 w-full z-50">
                    <LinearProgress color="inherit" sx={{ opacity: 0.8 }} />
                </div>
            )}
            <LabeledContent label={<span dir="ltr">{label}</span>}>
                <div className={`flex items-center gap-1 relative ${locale === 'heb' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <>
                        <IconButton
                            size="small"
                            onClick={() => setDay(yesterday)}
                            disabled={!yesterday || isNavigating}
                            sx={{ padding: '2px' }}
                        >
                            <ArrowBackIosNew fontSize="small" sx={{ fontSize: '0.8rem' }} />
                        </IconButton>
                        <div className="cursor-pointer font-mono text-[0.8rem] text-gray-500"
                            onClick={() => setOpen(p => !p)}>
                            {dateString}
                        </div>
                        <IconButton
                            size="small"
                            onClick={() => setDay(tomorrow)}
                            disabled={!tomorrow || isNavigating}
                            sx={{ padding: '2px' }}
                        >
                            <ArrowForwardIos fontSize="small" sx={{ fontSize: '0.8rem' }} />
                        </IconButton>
                    </>

                    {open && (
                        <div className="absolute top-full left-0 mt-2 z-10 bg-white shadow-lg direction-ltr">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateCalendar maxDate={today} onChange={(date) => {
                                    setDay(date);
                                    setOpen(false);
                                }}
                                    date={date}
                                />
                            </LocalizationProvider>
                        </div>
                    )}
                </div>
            </LabeledContent>
        </>
    );
}