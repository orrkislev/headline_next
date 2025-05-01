'use client'

import InnerLink from "@/components/InnerLink";
import { getHeadline } from "@/utils/daily summary utils";
import { Skeleton } from "@mui/material";
import { sub } from "date-fns";
import { createDateString } from '@/utils/utils';

export default function YesterdaySummary({ locale, country, yesterdaySummary, pageDate}) {
    
    let headline = <Skeleton variant="text" width={200} />;
    if (yesterdaySummary) headline = getHeadline(yesterdaySummary, locale);
    
    
    const yesterdayDate = sub(pageDate ? new Date(pageDate) : new Date(), { days: 1 });
    yesterdayDate.setHours(23, 59);

    let dateString
    if (pageDate){
        dateString = <span className="font-['GeistMono']">{yesterdayDate.toLocaleDateString('en-GB').replace(/\//g, '.')}</span>;
    } else {
        dateString = locale == 'heb' ? 'אתמול' : 'Yesterday';
    }
        
    return (
        <InnerLink href={`/${locale}/${country}/${createDateString(yesterdayDate)}`}>
            <h2 className={`hidden sm:block py-2 px-2 pb-4 cursor-pointer ${locale === 'heb' ? 'text-lg' : 'text-base'} text-blue ${locale === 'en'
                ? 'font-["Geist"] pr-4 font-medium'
                : 'frank-re pl-4'
                }`}
                style={{ lineHeight: '1.4em', borderBottom: '1px solid #e5e7eb' }}>

                <span>{dateString}</span>
                <span> {locale == 'heb' ? ' ⇠ ' : ' ⇢ '}</span>
                <span>{headline}</span>
            </h2>
        </InnerLink>
    );
}