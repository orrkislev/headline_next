'use client';

import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { useTranslate } from "@/utils/store";
import { Translate } from "@mui/icons-material";

export default function TranslateToggle() {
    const { setTranslate } = useTranslate();

    const handleClick = () => {
        setTranslate('ALL');
    }
    return (
        <CustomTooltip title="Translate" placement="bottom">
            <TopBarButton onClick={handleClick}>
                <Translate />
            </TopBarButton>
        </CustomTooltip>
    );
}