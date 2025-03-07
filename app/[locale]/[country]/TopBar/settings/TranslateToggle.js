'use client';

import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { useTranslate } from "@/utils/store";
import { Translate } from "@mui/icons-material";

export default function TranslateToggle() {
    const { translate, setTranslate } = useTranslate();

    const handleClick = () => {
        if (translate) setTranslate(false);
        else setTranslate(true);
    }
    return (
        <CustomTooltip title="Translate" placement="left">
            <TopBarButton onClick={handleClick}>
                <Translate />
            </TopBarButton>
        </CustomTooltip>
    );
}