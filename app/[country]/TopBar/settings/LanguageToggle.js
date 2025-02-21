import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { Language } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";

export default function LanguageToggle() {
    // const [globalData, setGlobalData] = useRecoilState(globalDataAtom);
    
    // const currentPath = window.location.pathname;
    // const isHebrew = currentPath.startsWith('/heb');
    // const englishPath = isHebrew ? currentPath.replace('/heb', '') : currentPath;

    // const handleLanguageToggle = () => {
    //     if (isHebrew) {
    //         window.location.href = englishPath;
    //         return;
    //     }
    //     const newLanguage = globalData.language === 'english' ? 'translated' : 'english';
    //     setGlobalData(prev => ({ ...prev, language: newLanguage }));
    // };

    // const getTooltipText = () => {
    //     if (isHebrew) return "Switch to English";
    //     return globalData.language === 'english' ? "Switch to overviews in the local language" : "Switch to English Overviews";
    // };

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: 0.5,
                pt: '4px',
            }}
        >
            <CustomTooltip
                // title={getTooltipText()}
                title="English"
                placement="left"
            >
                <TopBarButton>
                    <Language />
                </TopBarButton>
            </CustomTooltip>
        </Box>
    );
}