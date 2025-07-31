'use client'

import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { SettingsRounded, InfoOutlined } from "@mui/icons-material";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Settings = dynamic(() => import("./settings/Settings"));
const AboutMenu = dynamic(() => import("./AboutMenu"));

export function SettingsButton({ locale, country, sources, isRightPanelCollapsed }) {
    const [open, setOpen] = useState(false);
    const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
    
    // Calculate conditions here where we have access to props
    const isSpecialCase = (locale === 'heb' && country === 'israel') || 
                        (locale === 'en' && (country === 'us' || country === 'uk'));

    return (
        <>
            <div className={` ${open ? `w-auto opacity-100 ml-4 ${locale !== 'heb' ? 'mr-4' : ''}` : 'w-0 opacity-0 ml-0'}`}>
                <Settings 
                    locale={locale} 
                    country={country} 
                    sources={sources}
                    isRightPanelCollapsed={isRightPanelCollapsed}
                    hideLanguageToggle={isSpecialCase}
                    hideTranslateToggle={isSpecialCase}
                />
            </div>
            <div className="flex items-center">
                <CustomTooltip title="About the Hear" arrow>
                    <TopBarButton size="small" onClick={() => setAboutMenuOpen(true)}>
                        <InfoOutlined />
                    </TopBarButton>
                </CustomTooltip>
                <div className="w-2"></div>
                <CustomTooltip title="Settings" arrow>
                    <TopBarButton size="small" onClick={() => setOpen(prev => !prev)}>
                        <SettingsRounded sx={{ color: open ? "black" : "inherit" }} />
                    </TopBarButton>
                </CustomTooltip>
            </div>
            <AboutMenu open={aboutMenuOpen} onClose={() => setAboutMenuOpen(false)} />
        </>
    );
}
