import { TextFields } from "@mui/icons-material";
import { useMemo } from "react";
import CustomTooltip from "@/components/CustomTooltip";
import { getTypographyOptions } from "@/utils/typography/typography";
import { TopBarButton } from "@/components/IconButtons";

export default function FontToggle({ country, font, setFont }) {
    const fontOptions = useMemo(() => {
        const options = [...getTypographyOptions(country).options, "random"];
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
        <div className="flex flex-col items-center">
            <CustomTooltip title={toolTip} placement="left">
                <TopBarButton onClick={handleNextFont}>
                    <TextFields sx={{ color: font === "random" ? "blue" : "inherit" }} />
                </TopBarButton>
            </CustomTooltip>
        </div>
    );
}