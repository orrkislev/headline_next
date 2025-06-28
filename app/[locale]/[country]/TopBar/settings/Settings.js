'use client'

import LabeledIcon from "@/components/LabeledIcon";
import FontToggle from "./FontToggle";
import LanguageToggle from "./LanguageToggle";
import TranslateToggle from "./TranslateToggle";
import OrderToggle from "./OrderToggle";
import SourcesToggle from "./SourcesToggle";
import { DateSelector } from "./DateSelector";
import { PublicOutlined, InfoOutlined } from "@mui/icons-material";
import { TopBarButton } from "@/components/IconButtons";
import CustomTooltip from "@/components/CustomTooltip";
import InnerLink from "@/components/InnerLink";

export default function Settings({ locale, country, sources, isRightPanelCollapsed, hideLanguageToggle, hideTranslateToggle }) {

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
                <DateSelector {...{ locale, country }} />
            </div>
            <div className="flex items-center font-['Geist']">
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
                <LabeledIcon
                    label="About"
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
                <div className="flex items-center font-['Geist']">
                    <LabeledIcon label="Overview Language" icon={<LanguageToggle />} />
                </div>
            )}
            <div className="flex items-center font-['Geist']">
                <LabeledIcon label="Fonts" icon={<FontToggle country={country} isRightPanelCollapsed={isRightPanelCollapsed} />} />
                {!shouldHideTranslate && (
                    <LabeledIcon label="Translate Headlines" icon={<TranslateToggle {...{ locale, country, sources }} />} />
                )}
            </div>
            <div className="flex items-center font-['Geist']">
                <LabeledIcon label="Source Order" icon={<OrderToggle locale={locale} />} />
                <LabeledIcon label="Sources" icon={<SourcesToggle {...{ country, locale, sources }} />} />
            </div>
        </div>
    );
}