'use client'

import ResetTimerButton from "./Slider/ResetTimerButton";
import Flag from "./TopBar/Flag";
import TimeDisplay from "./TopBar/TimeDisplay";
import { PublicOutlined } from "@mui/icons-material";
import useMobile from "@/components/useMobile";
import InnerLink from "@/components/InnerLink";

export default function MobileBar({ locale, country, pageDate }) {
    const isMobile = useMobile();
    
    if (!isMobile) return null;
    return (
        <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200 divide-x-reverse divide-gray-200">
            <div className="flex flex-1 justify-between items-center">
                <InnerLink href="/global">
                    <PublicOutlined />
                </InnerLink>
                <Flag {...{ country, locale }} />
            </div>
            <div className="flex flex-1 justify-between items-center">
                <TimeDisplay locale={locale} />
                <ResetTimerButton {...{ locale, country, pageDate }} />
            </div>
        </div>
    )
}