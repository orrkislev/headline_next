'use client'

import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { SettingsRounded, InfoOutlined } from "@mui/icons-material";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useTranslate } from "@/utils/store";
import { createPortal } from "react-dom";

const AboutMenu = dynamic(() => import("./AboutMenu"));
const TranslateToggle = dynamic(() => import("./settings/TranslateToggle"));

export function SettingsButton({ locale, country, sources, isRightPanelCollapsed, userCountry, settingsOpen, setSettingsOpen }) {
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
            <div className="flex items-center bg-sky-100 rounded-md px-3 py-2 gap-4">
                {!shouldHideTranslate && (
                    <TranslateToggle
                        {...{ locale, country, sources, userCountry }}
                        tooltipTitle={isTranslationActive ?
                            (locale === 'heb' ? "מתורגם" : "Translated") :
                            (locale === 'heb' ? "תרגם כותרות" : "Translate headlines")}
                    />
                )}
                <CustomTooltip title={locale === 'heb' ? "אודות The Hear" : "About the Hear"} arrow>
                    <TopBarButton size="small" onClick={() => setAboutMenuOpen(true)}>
                        <InfoOutlined />
                    </TopBarButton>
                </CustomTooltip>
                <CustomTooltip title={locale === 'heb' ? "הגדרות" : "Settings"} arrow>
                    <TopBarButton size="small" onClick={() => setSettingsOpen(prev => !prev)}>
                        <SettingsRounded sx={{ color: settingsOpen ? "black" : "inherit" }} />
                    </TopBarButton>
                </CustomTooltip>
            </div>
            {aboutMenuOpen && typeof window !== 'undefined' && createPortal(
                <AboutMenu open={aboutMenuOpen} onClose={() => setAboutMenuOpen(false)} />,
                document.body
            )}
        </>
    );
}
