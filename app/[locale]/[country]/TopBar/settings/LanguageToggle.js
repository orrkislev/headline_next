import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { Language } from "@mui/icons-material";
import { useTranslate } from "@/utils/store";

export default function LanguageToggle() {
    const useLocalLanguage = useTranslate(state => state.useLocalLanguage)
    const toggleLocalLanguage = useTranslate(state => state.toggleLocalLanguage)

    const toolTipText = useLocalLanguage ? 'Switch to English overviews' : 'Switch to overviews in the local language';

    return (
        <CustomTooltip
            title={toolTipText}
            placement="bottom"
        >
            <TopBarButton onClick={toggleLocalLanguage}>
                <Language sx={{ color: useLocalLanguage ? "blue" : "inherit" }} />
            </TopBarButton>
        </CustomTooltip>
    );
}