'use client';

import CustomTooltip from "@/components/CustomTooltip";
import { Restore } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function ResetTimerButton({date, setDate, locale, className}) {
    const isPresent = new Date() - date < 60 * 1000 * 5;

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