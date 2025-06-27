import React, { forwardRef } from "react";
import { Tooltip } from "@mui/material";

const defaultSlotProps = {
    tooltip: {
        sx: {
            fontWeight: "normal",
            color: "black",
            bgcolor: "white",
            border: "1px solid #E0E0E0",
        },
    },
    arrow: {
        sx: {
            color: "white",
            "&::before": {
                border: "1px solid #E0E0E0",
            },
        },
    },
};

const CustomTooltip = forwardRef(function CustomTooltip(props, ref) {
    const { slotProps, title, ...others } = props;
    
    // Check if tooltip content has multiple lines (either line breaks or long text)
    const isMultiLine = title && (
        title.includes('\n') || 
        title.includes('<br') || 
        title.length > 50
    );
    
    const tooltipStyles = {
        ...defaultSlotProps.tooltip.sx,
        ...(isMultiLine && { padding: '12px 10px' })
    };

    return (
        <Tooltip
            {...others}
            title={title}
            arrow
            ref={ref}
            slotProps={{
                tooltip: {
                    sx: tooltipStyles,
                },
                arrow: defaultSlotProps.arrow,
                ...slotProps,
            }}
        >
            {props.children}
        </Tooltip>
    );
});

export default CustomTooltip;