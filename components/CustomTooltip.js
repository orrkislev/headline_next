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
    const { slotProps, ...others } = props;

    return (
        <Tooltip
            {...others}
            arrow
            ref={ref}
            slotProps={{
                ...defaultSlotProps,
                ...slotProps,
            }}
        >
            {props.children}
        </Tooltip>
    );
});

export default CustomTooltip;