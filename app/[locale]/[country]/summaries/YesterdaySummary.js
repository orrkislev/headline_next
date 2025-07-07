'use client'

import { useEffect, useState } from "react";
import InnerLink from "@/components/InnerLink";
import { getHeadline } from "@/utils/daily summary utils";
import { Skeleton } from "@mui/material";
import { sub } from "date-fns";
import { createDateString } from '@/utils/utils';
import useFirebase from "@/utils/database/useFirebase";

export default function YesterdaySummary({ locale, country, yesterdaySummary, pageDate}) {
    const [dynamicYesterdaySummary, setDynamicYesterdaySummary] = useState(yesterdaySummary);
    const [lastCheckedDate, setLastCheckedDate] = useState(new Date().toDateString());
    const firebase = useFirebase();
    
    // Blinking state for the arrow
    const [blink, setBlink] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            setBlink(prev => !prev);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    
    let headline = <Skeleton variant="text" width={200} />;
    if (dynamicYesterdaySummary) headline = getHeadline(dynamicYesterdaySummary, locale);
    
    const yesterdayDate = sub(pageDate ? new Date(pageDate) : new Date(), { days: 1 });
    yesterdayDate.setHours(23, 59);

    // Check if we need to fetch fresh yesterday summary when page becomes visible
    useEffect(() => {
        const fetchYesterdayData = async () => {
            if (!firebase.ready) return;
            
            const currentDate = new Date().toDateString();
            if (currentDate !== lastCheckedDate && !pageDate) {
                try {
                    const freshYesterdayDate = sub(new Date(), { days: 1 });
                    const freshYesterdaySummary = await firebase.getCountryDailySummary(country, freshYesterdayDate);
                    setDynamicYesterdaySummary(freshYesterdaySummary);
                    setLastCheckedDate(currentDate);
                } catch (error) {
                    console.error('Failed to fetch fresh yesterday summary:', error);
                }
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                fetchYesterdayData();
            }
        };

        // Check on mount
        fetchYesterdayData();

        // Listen for visibility changes
        document.addEventListener("visibilitychange", handleVisibilityChange);
        
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [firebase.ready, country, lastCheckedDate, pageDate]);

    // Reset to initial data when pageDate or country changes
    useEffect(() => {
        setDynamicYesterdaySummary(yesterdaySummary);
        setLastCheckedDate(new Date().toDateString());
    }, [yesterdaySummary, country, pageDate]);

    let dateString
    if (pageDate){
        dateString = <span className="font-['GeistMono'] font-medium">{yesterdayDate.toLocaleDateString('en-GB').replace(/\//g, '.')}</span>;
    } else {
        dateString = locale == 'heb' ? 'אתמול' : 'Yesterday';
    }
        
    return (
        <InnerLink href={`/${locale}/${country}/${createDateString(yesterdayDate)}`}>
            <h2 className={`hidden sm:block py-2 px-2 pb-4 cursor-pointer ${locale === 'heb' ? 'text-[17px]' : 'text-base'} text-black hover:text-blue ${locale === 'en'
                ? 'font-["Geist"] pr-4 font-medium'
                : 'frank-re pl-4'
                }`}
                style={{ lineHeight: '1.4em', borderBottom: '1px solid #e5e7eb' }}>

                <span>{dateString}</span>
                <span style={{ visibility: blink ? 'visible' : 'hidden' }}> {locale == 'heb' ? ' ⇠ ' : ' ⇢ '}</span>
                <span>{headline}</span>
            </h2>
        </InnerLink>
    );
}