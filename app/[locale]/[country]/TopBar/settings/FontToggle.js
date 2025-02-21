import { Box, IconButton } from "@mui/material";
import { TextFields } from "@mui/icons-material";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import CustomTooltip from "@/components/CustomTooltip";
import { usePreferences } from "@/components/PreferencesManager";
import { getTypographyOptions } from "@/utils/typography";
import { TopBarButton } from "@/components/IconButtons";

export default function FontToggle() {
    const { country } = useParams();
    const font = usePreferences((state) => state.font);
    const setFont = usePreferences((state) => state.setFont);

    const fontOptions = useMemo(() => {
        const options = [...getTypographyOptions(country), "random"];
        return options;
    }, [country]);

    const handleNextFont = () => {
        const currentIndex = fontOptions.indexOf(font);
        const nextIndex = (currentIndex + 1) % fontOptions.length;
        const nextFont = fontOptions[nextIndex];
        setFont(nextFont);
    };

    const toolTip = font === "random" ? "Font Salad" : "Change headlines font";

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <CustomTooltip title={toolTip} placement="left">
                <TopBarButton onClick={handleNextFont}>
                    <TextFields sx={{ color: font === "random" ? "blue" : "inherit" }} />
                </TopBarButton>
            </CustomTooltip>
        </Box>
    );
}