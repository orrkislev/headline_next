'use client'

import { TextFields } from "@mui/icons-material";
import { useMemo } from "react";
import CustomTooltip from "@/components/CustomTooltip";
import { getTypographyOptions } from "@/utils/typography/typography";
import { TopBarButton } from "@/components/IconButtons";
import { useFont } from "@/utils/store";

export default function FontToggle({ country }) {
    const { font, setFont } = useFont();

    const fontOptions = useMemo(() => {
        const options = [...getTypographyOptions(country).options, "random"];
        return options;
    }, [country]);

    const handleNextFont = () => {
        let currentIndex = fontOptions.indexOf(font)
        if (currentIndex === -1) currentIndex = 0;
        const nextIndex = (currentIndex + 1) % fontOptions.length;
        const nextFont = fontOptions[nextIndex];
        setFont(nextFont);
    };

    const toolTip = font === "random" ? "Font Salad" : "Change headlines font";

    return (
        <div className="flex flex-col items-center">
            <CustomTooltip title={toolTip} placement="left">
                <TopBarButton onClick={handleNextFont}>
                    <TextFields sx={{ color: font === "random" ? "blue" : "inherit" }} />
                </TopBarButton>
            </CustomTooltip>
        </div>
    );
}