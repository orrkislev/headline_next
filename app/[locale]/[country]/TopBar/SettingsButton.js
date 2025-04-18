'use client'

import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { SettingsRounded } from "@mui/icons-material";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Settings = dynamic(() => import("./settings/Settings"));

export function SettingsButton({ locale, country, sources }) {
    const [open, setOpen] = useState(false);
    
    // Calculate conditions here where we have access to props
    const isSpecialCase = (locale === 'heb' && country === 'israel') || 
                        (locale === 'en' && (country === 'us' || country === 'uk'));

    return (
        <>
            <div className={`transition-all duration-300 ease-in-out ${open ? 'w-auto opacity-100 ml-4' : 'w-0 opacity-0 ml-0'}`}>
                <Settings 
                    locale={locale} 
                    country={country} 
                    sources={sources}
                    hideLanguageToggle={isSpecialCase}
                    hideTranslateToggle={isSpecialCase}
                />
            </div>
            <div className="flex items-center">
                <CustomTooltip title="Settings" arrow>
                    <TopBarButton size="small" onClick={() => setOpen(prev => !prev)}>
                        <SettingsRounded sx={{ color: open ? "blue" : "inherit" }} />
                    </TopBarButton>
                </CustomTooltip>
            </div>
        </>
    );
}
