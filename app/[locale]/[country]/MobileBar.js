'use client'

import { useTime } from "@/utils/store";
import ResetTimerButton from "./Slider/ResetTimerButton";
import Flag from "./TopBar/Flag";
import TimeDisplay from "./TopBar/TimeDisplay";
import { PublicOutlined } from "@mui/icons-material";
import Link from "next/link";
import useMobile from "@/components/useMobile";

export default function MobileBar({ locale, country }) {
    const { date, setDate } = useTime();
    const isMobile = useMobile();
    
    if (!isMobile) return null;
    return (
        <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200 divide-x-reverse divide-gray-200">
            <div className="flex flex-1 justify-between items-center">
                <Link href="/global">
                    <PublicOutlined />
                </Link>
                <Flag {...{ country, locale }} />
            </div>
            <div className="flex flex-1 justify-between items-center">
                <TimeDisplay locale={locale} />
                <ResetTimerButton {...{ date, setDate, locale }} />
            </div>
        </div>
    )
}