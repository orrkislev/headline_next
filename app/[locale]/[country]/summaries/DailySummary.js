'use client'

import { useEffect, useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Collapse, IconButton } from '@mui/material';
import { getHeadline, getSummaryContent } from '@/utils/daily summary utils';
import { useTime } from '@/utils/store';

export default function DailySummary({ locale, daySummary }) {
    const [expanded, setExpanded] = useState(false);

    const dayString = useTime(state => state.date.toISOString().split('T')[0]);
    if (!daySummary) return null;

    // Format date as dd.mm.yyyy
    const formattedDate = new Date(dayString)
        .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        .replace(/\//g, '.');

    const headline = getHeadline(daySummary, locale);
    const summaryContent = getSummaryContent(daySummary, locale);

    return (
        <div className="bg-neutral-100 w-full rounded-sm hover:shadow-xl">
            <div 
                className='flex items-center justify-between relative cursor-pointer p-4' 
                onClick={() => setExpanded(!expanded)}
            >
                <h2 className={`flex-1 ${locale === 'heb' ? 'frank-re text-right text-[17px]' : 'font-["Geist"] text-left text-base'} text-black font-medium`}>
                    <span className="font-['GeistMono'] text-base">{formattedDate}</span>
                    <span className="mx-1">{locale == 'heb' ? ' ⇠ ' : ' ⇢ '}</span>
                    <span style={{ lineHeight: '1.5rem' }}>{headline}</span>
                </h2>
                <IconButton size="small" className="ml-2 self-center animate-pulse">
                    {expanded ? 
                        <KeyboardArrowUp sx={{ color: 'black' }} /> : 
                        <KeyboardArrowDown sx={{ color: 'black' }} />
                    }
                </IconButton>
            </div>
            
            <Collapse in={expanded}>
                <div 
                    className={`px-4 custom-scrollbar font-normal pb-6 ${locale === 'heb' ? 'frank-re text-right text-base' : 'font-["Geist"] text-left text-sm'}`} 
                    style={{ 
                        lineHeight: '1.5',
                        maxHeight: '45vh',
                        overflowY: 'auto'
                    }}
                >
                    <div dangerouslySetInnerHTML={{ __html: summaryContent }} />
                </div>
            </Collapse>
        </div>
    );
}
