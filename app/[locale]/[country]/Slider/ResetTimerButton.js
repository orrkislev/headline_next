'use client';

import CustomTooltip from "@/components/CustomTooltip";
import { Restore } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect } from "react";
import { useTime } from "@/utils/store";
import { isToday } from "date-fns";
import { redirect } from "next/navigation";

export default function ResetTimerButton({ locale, country, className, pageDate }) {
    const date = useTime(state => state.date);
    const setDate = useTime(state => state.setDate);
    const isPresent = new Date() - date < 60 * 1000 * 5;

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isPresent) setDate(new Date());
        }, 60 * 1000);
        return () => clearInterval(timer);
    }, [isPresent, setDate]);

    useEffect(() => {
        if (!pageDate) return;
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") setDate(new Date());
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [pageDate])

    const tooltip = locale === 'heb' ? 'בחזרה לעכשיו' : 'Reset To Now';
    const placement = locale === 'heb' ? 'left' : 'right';

    const handleClick = () => {
        if (isToday(date)) {
            setDate(new Date());
        } else {
            redirect(`/${locale}/${country}`);
        }
    }

    return (
        <CustomTooltip title={tooltip} arrow open={!isPresent} placement={placement}>
            <IconButton
                className={`transition-colors duration-300 ${isPresent ? '' : 'animate-slow-fade'} ` + className}
                onClick={handleClick}
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