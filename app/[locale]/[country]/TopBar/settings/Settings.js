'use client'

import LabeledIcon from "@/components/LabeledIcon";
import FontToggle from "./FontToggle";
import LanguageToggle from "./LanguageToggle";
import TranslateToggle from "./TranslateToggle";
import OrderToggle from "./OrderToggle";
import SourcesToggle from "./SourcesToggle";
import { DateSelector } from "./DateSelector";
import ArchiveToggle from "./ArchiveToggle";
import { PublicOutlined, Search } from "@mui/icons-material";
import { TopBarButton } from "@/components/IconButtons";
import CustomTooltip from "@/components/CustomTooltip";
import InnerLink from "@/components/InnerLink";
import { useEffect, useState } from "react";

export default function Settings({ locale, country, sources, isRightPanelCollapsed, hideLanguageToggle, hideTranslateToggle, userCountry }) {
    const [isFhd, setIsFhd] = useState(false);
    const [isXl, setIsXl] = useState(false);
    const [isLg, setIsLg] = useState(false);

    // Check if screen is fhd (1920px+)
    useEffect(() => {
        const checkScreenSize = () => {
            setIsFhd(window.innerWidth >= 1920);
        };

        // Check on mount
        checkScreenSize();

        // Add event listener for resize
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Check if screen is xl (1600px+)
    useEffect(() => {
        const checkScreenSize = () => {
            setIsXl(window.innerWidth >= 1600);
        };

        // Check on mount
        checkScreenSize();

        // Add event listener for resize
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Check if screen is lg (1366px+)
    useEffect(() => {
        const checkScreenSize = () => {
            setIsLg(window.innerWidth >= 1366);
        };

        // Check on mount
        checkScreenSize();

        // Add event listener for resize
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Force the hiding based on direct check as a fallback
    const shouldHideLanguage = hideLanguageToggle ||
        (locale === 'heb' && country === 'Israel') ||
        (locale === 'en' && (country === 'US' || country === 'UK'));

    const shouldHideTranslate = hideTranslateToggle ||
        (locale === 'heb' && country === 'Israel') ||
        (locale === 'en' && (country === 'US' || country === 'UK'));

    return (
        <>
            <div className={`flex items-center gap-1 ${locale == 'heb' ? 'flex-row-reverse' : ''}`}>
                {isLg && (
                    <div className="flex items-center font-['Geist'] bg-gray-50 rounded-md mx-1 hover:bg-gray-100">
                        <DateSelector {...{ locale, country }} />
                        <LabeledIcon label="Archives" icon={<ArchiveToggle locale={locale} country={country} />} />
                    </div>
                )}
                {isLg && (
                    <div className="flex items-center font-['Geist'] bg-gray-50 rounded-md mx-1 hover:bg-gray-100">
                        <LabeledIcon
                            label="Search"
                            icon={
                                <InnerLink locale={locale} href={`/${locale}/${country}/search`}>
                                    <CustomTooltip title="search the archives" placement="bottom" arrow>
                                        <TopBarButton>
                                            <Search />
                                        </TopBarButton>
                                    </CustomTooltip>
                                </InnerLink>
                            }
                        />
                    </div>
                )}
                {isFhd && (
                    <div className="flex items-center font-['Geist'] bg-gray-50 rounded-md mx-1 hover:bg-gray-100">
                        <LabeledIcon
                            label="Global View"
                            icon={
                                <InnerLink locale={locale} href={`/${locale}/global`}>
                                    <CustomTooltip title="to the global view" placement="bottom" arrow>
                                        <TopBarButton>
                                            <PublicOutlined />
                                        </TopBarButton>
                                    </CustomTooltip>
                                </InnerLink>
                            }
                        />
                    </div>
                )}
                {!shouldHideLanguage && isXl && (
                    <div className="flex items-center font-['Geist'] bg-gray-50 rounded-md mx-1 hover:bg-gray-100">
                        <LabeledIcon label="Overview Language" icon={<LanguageToggle />} />
                    </div>
                )}
                {isFhd && (
                    <div className="flex items-center font-['Geist'] bg-gray-50 rounded-md mx-1 hover:bg-gray-100">
                        <LabeledIcon label="Fonts" icon={<FontToggle country={country} isRightPanelCollapsed={isRightPanelCollapsed} />} />
                    </div>
                )}
                <div className="flex items-center font-['Geist'] bg-gray-50 rounded-md mx-1 hover:bg-gray-100">
                    {!shouldHideTranslate && (
                        <LabeledIcon label="Translate Headlines" icon={<TranslateToggle {...{ locale, country, sources, userCountry }} />} />
                    )}
                </div>
                <div className="flex items-center font-['Geist'] bg-gray-50 rounded-md mx-1 hover:bg-gray-100">
                    <LabeledIcon label="Source Order" icon={<OrderToggle locale={locale} />} />
                    <LabeledIcon label="Sources" icon={<SourcesToggle {...{ country, locale, sources }} />} />
                </div>
            </div>
        </>
    );
}