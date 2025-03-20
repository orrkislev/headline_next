import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { Language } from "@mui/icons-material";
import { useTranslate } from "@/utils/store";

export default function LanguageToggle() {
    const useLocalLanguage = useTranslate(state => state.useLocalLanguage)
    const toggleLocalLanguage = useTranslate(state => state.toggleLocalLanguage)

    const toolTipText = useLocalLanguage ? 'Switch to English overviews' : 'Switch to overviews in the local language';

    return (
        <div className='flex flex-col items-center gap-2 pt-1'>
            <CustomTooltip
                title={toolTipText}
                placement="bottom"
            >
                <TopBarButton onClick={toggleLocalLanguage}>
                    <Language color={useLocalLanguage ? 'primary' : ''} />
                </TopBarButton>
            </CustomTooltip>
        </div>
    );
}