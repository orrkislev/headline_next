'use client';

import CustomTooltip from "@/components/CustomTooltip";
import { Restore } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useTime } from "@/utils/store";
import { isToday } from "date-fns";
import { useRouter, usePathname } from "next/navigation";
import { LinearProgress } from "@mui/material";

export default function ResetTimerButton({ locale, country, className, pageDate }) {
    const date = useTime(state => state.date);
    const setDate = useTime(state => state.setDate);
    const [isNavigating, setIsNavigating] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isPresent = new Date() - date < 60 * 1000 * 5;

    // Reset loading state when pathname changes
    useEffect(() => {
        if (isNavigating) {
            setIsNavigating(false);
        }
    }, [pathname]);

    useEffect(() => {
        if (pageDate) return;
        const timer = setInterval(() => {
            if (!isPresent) setDate(new Date());
        }, 60 * 1000);
        return () => clearInterval(timer);
    }, [isPresent, setDate, pageDate]);

    useEffect(() => {
        if (pageDate) return;
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") setDate(new Date());
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [pageDate])

    const tooltip = locale === 'heb' ? 'בחזרה לעכשיו' : 'Reset To Now';
    const placement = locale === 'heb' ? 'bottom' : 'right';

    const handleClick = () => {
        if (isToday(date)) {
            setDate(new Date());
        } else {
            setIsNavigating(true);
            router.push(`/${locale}/${country}`);
        }
    }

    return (
        <>
            {isNavigating && (
                <div className="fixed top-0 left-0 w-full z-50">
                    <LinearProgress color="inherit" sx={{ opacity: 0.8 }} />
                </div>
            )}
            <CustomTooltip title={tooltip} arrow open={!isPresent} placement={placement}>
                <IconButton
                    className={`transition-colors duration-300 ${isPresent ? '' : 'animate-slow-fade'} ` + className}
                    onClick={handleClick}
                    disabled={isNavigating}
                    size="small"
                    sx={{
                        color: isPresent ? 'lightgray' : 'blue'
                    }}
                >
                    <Restore fontSize="small" />
                </IconButton>
            </CustomTooltip>
        </>
    )
}