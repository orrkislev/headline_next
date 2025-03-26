'use client'

import { useEffect } from 'react';
import LabeledIcon from "@/components/LabeledIcon";
import FontToggle from "./FontToggle";
import ViewToggle from "./ViewToggle";
import LanguageToggle from "./LanguageToggle";
import TranslateToggle from "./TranslateToggle";
import OrderToggle from "./OrderToggle";
import SourcesToggle from "./SourcesToggle";
import { DateSelector } from "./DateSelector";
import PopUpCleaner from "@/components/PopUp";
import { PublicOutlined, InfoOutlined } from "@mui/icons-material";
import Link from "next/link";
import { TopBarButton } from "@/components/IconButtons";
import CustomTooltip from "@/components/CustomTooltip";
import InnerLink from "@/components/InnerLink";

export default function Settings({ locale, country, sources, hideLanguageToggle, hideTranslateToggle }) {
    // Debug logging
    useEffect(() => {
        console.log("Settings component received:", { 
            locale, 
            country, 
            hideLanguageToggle, 
            hideTranslateToggle 
        });
    }, [locale, country, hideLanguageToggle, hideTranslateToggle]);

    // Force the hiding based on direct check as a fallback
    const shouldHideLanguage = hideLanguageToggle || 
        (locale === 'heb' && country === 'Israel') || 
        (locale === 'en' && (country === 'US' || country === 'UK'));
    
    const shouldHideTranslate = hideTranslateToggle || 
        (locale === 'heb' && country === 'Israel') || 
        (locale === 'en' && (country === 'US' || country === 'UK'));

    return (
        <div className={`flex items-center divide-x divide-gray-200 ${locale == 'heb' ? 'divide-x-reverse' : ''}`}>
            <div className="">
                <DateSelector {...{ locale }} />
            </div>
            <div className="flex items-center">
                <LabeledIcon
                    label="Global View"
                    icon={
                        <InnerLink href="/global">
                            <CustomTooltip title="to the global view" placement="bottom" arrow>
                                <TopBarButton>
                                    <PublicOutlined />
                                </TopBarButton>
                            </CustomTooltip>
                        </InnerLink>
                    }
                />
                <LabeledIcon
                    label="About the Hear"
                    icon={
                        <InnerLink href="/landing">
                            <CustomTooltip title="About the Hear" placement="bottom" arrow>
                                <TopBarButton>
                                    <InfoOutlined />
                                </TopBarButton>
                            </CustomTooltip>
                        </InnerLink>
                    }
                />
            </div>
            {!shouldHideLanguage && (
                <div className="flex items-center">
                    <LabeledIcon label="Overview Language" icon={<LanguageToggle />} />
                </div>
            )}
            <div className="flex items-center">
                <LabeledIcon label="Display Font" icon={<FontToggle country={country}/>} />
                {!shouldHideTranslate && (
                    <LabeledIcon label="Translate Headlines" icon={<TranslateToggle {...{ locale, country, sources }} />} />
                )}
            </div>
            <div className="flex items-center">
                <LabeledIcon label="Source Order" icon={<OrderToggle locale={locale} />} />
                <LabeledIcon label="Sources" icon={<SourcesToggle {...{ country, locale, sources }} />} />
            </div>
        </div>
    );
}