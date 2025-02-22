import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { Language } from "@mui/icons-material";
import { useParams } from "next/navigation";

export default function LanguageToggle() {
    const { locale } = useParams()

    const toolTipText = locale === 'en' ? 'Switch to Hebrew' : 'Switch to English';

    const switchLanguage = () => {
        const newLocale = locale === 'en' ? 'heb' : 'en';
        window.location.href = window.location.pathname.replace(`/${locale}/`, `/${newLocale}/`);
    }

    return (
        <div className='flex flex-col items-center gap-2 pt-1'>
            <CustomTooltip
                title={toolTipText}
                placement="left"
            >
                <TopBarButton onClick={switchLanguage}>
                    <Language />
                </TopBarButton>
            </CustomTooltip>
        </div>
    );
}