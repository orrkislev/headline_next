'use client'

import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { SettingsRounded, InfoOutlined } from "@mui/icons-material";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useTranslate } from "@/utils/store";

const Settings = dynamic(() => import("./settings/Settings"));
const AboutMenu = dynamic(() => import("./AboutMenu"));
const TranslateToggle = dynamic(() => import("./settings/TranslateToggle"));

export function SettingsButton({ locale, country, sources, isRightPanelCollapsed, userCountry }) {
    const [open, setOpen] = useState(false);
    const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
    const translate = useTranslate(state => state.translate);
    
    // Calculate conditions here where we have access to props
    const isSpecialCase = (locale === 'heb' && country === 'israel') || 
                        (locale === 'en' && (country === 'us' || country === 'uk'));

    // Force the hiding based on direct check as a fallback
    const shouldHideTranslate = isSpecialCase ||
        (locale === 'heb' && country === 'Israel') ||
        (locale === 'en' && (country === 'US' || country === 'UK'));

    // Check if translation is active
    const isTranslationActive = translate.length > 0;

    return (
        <>
            <div className={` ${open ? `w-auto opacity-100 ml-4 ${locale !== 'heb' ? 'mr-4' : ''}` : 'w-0 opacity-0 ml-0'}`}>
                <Settings 
                    locale={locale} 
                    country={country} 
                    sources={sources}
                    isRightPanelCollapsed={isRightPanelCollapsed}
                    hideLanguageToggle={isSpecialCase}
                    userCountry={userCountry}
                />
            </div>
            <div className="flex items-center">
                {!shouldHideTranslate && (
                    <>
                        <TranslateToggle 
                            {...{ locale, country, sources, userCountry }} 
                            tooltipTitle={isTranslationActive ? "Translated" : "Translate headlines"}
                        />
                        <div className="w-2"></div>
                    </>
                )}
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
