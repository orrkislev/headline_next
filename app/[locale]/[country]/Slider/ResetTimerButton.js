'use client';

import CustomTooltip from "@/components/CustomTooltip";
import { Restore } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect } from "react";
import { useTime } from "@/utils/store";

export default function ResetTimerButton({ locale, className }) {
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
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") setDate(new Date());
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [])

    const tooltip = locale === 'heb' ? 'בחזרה לעכשיו' : 'Reset To Now';
    const placement = locale === 'heb' ? 'left' : 'right';

    return (
        <CustomTooltip title={tooltip} arrow open={!isPresent} placement={placement}>
            <IconButton
                className={`transition-colors duration-300 ${isPresent ? '' : 'animate-slow-fade'} ` + className}
                onClick={() => setDate(new Date())}
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