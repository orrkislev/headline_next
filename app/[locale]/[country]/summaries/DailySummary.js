'use client'

import { useEffect, useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Collapse, IconButton, keyframes, styled } from '@mui/material';
import { getHeadline, getSummaryContent } from '@/utils/daily summary utils';
import { useTime } from '@/utils/store';
import { useDailySummary } from '@/utils/database/useDailySummariesManager';

export default function DailySummary({ locale }) {
    const [open, setOpen] = useState(false);
    return (
        <Collapse in={open} orientation='horizontal'>
            <DailySummaryContent locale={locale} setOpen={setOpen} />
        </Collapse>
    )
}

function DailySummaryContent({ locale, setOpen }) {
    // const date = useTime(state => state.date);
    // const [dayString, setDayString] = useState(new Date().toISOString().split('T')[0]);
    // const [dailySummary, setDailySummary] = useState(null);
    const dailySummary = useDailySummary(state => state.dailySummary);
    const dayString = useDailySummary(state => state.day);
    // const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        if (dailySummary) setOpen(true);
    }, [dailySummary])

    // useEffect(() => {
    //     if (date) setDayString(date.toISOString().split('T')[0]);
    // }, [date]);

    // useEffect(() => {
    //     setDailySummary(dailySummaries.find(summary => summary?.date === dayString));
    // }, [dayString, dailySummaries]);

    if (!dailySummary) return null

    // Format date as dd.mm.yyyy
    const formattedDate = new Date(dayString)
        .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        .replace(/\//g, '.');

    const headline = getHeadline(dailySummary, locale);
    const summaryContent = getSummaryContent(dailySummary, locale);

    return (
        <div className="bg-white pb-2 border-gray-200 max-w-[300px] pt-4 border-l border-r px-2">
            <div className='flex items-start justify-between relative cursor-pointer flex-row-reverse' onClick={() => setOpen(false)}>
                <div className={`text-blue flex-1 pl-2 pr-2 ${locale === 'heb' ? 'pl-8' : 'pr-12'} mb-2 text-[1.5rem] ${locale === 'heb' ? 'frank-re' : 'font-roboto'}`} style={locale === 'heb' ? { lineHeight: '1.5' } : {}}>
                    <span className="font-mono">{formattedDate}</span>
                    {/* <span> {locale === 'heb' ? ' ⇠ ' : ' ⇢ '}</span> */}
                    <div>{headline}</div>
                </div>

                {/* <div className={`absolute top-0 flex flex-col gap-[-0.5em] ${locale === 'heb' ? 'left-0' : 'right-0'}`}>
                    {expanded ? (
                        <KeyboardArrowUp sx={{ color: 'blue' }} />
                    ) : [0, 1, 2].map((index) => (
                        <RunwayButton key={index} size="small" delay={index * 0.15} >
                            <KeyboardArrowDown sx={{ color: 'blue', padding: 0 }} />
                        </RunwayButton>
                    ))
                    }
                </div> */}
            </div>
            <div className={`custom-scrollbar leading-none font-normal mt-1 ${locale === 'heb' ? 'pl-4 pr-2' : 'pl-2 pr-4'} text-[17px] ${locale === 'heb' ? 'frank-re' : 'font-roboto'}`} style={{ lineHeight: '1.3', }}>
                <div dangerouslySetInnerHTML={{ __html: summaryContent }} />
            </div>
        </div>
    )
}


const runwayAnimation = keyframes`
  0%, 15% { opacity: 0.1; }
  25% { opacity: 1; }
  35%, 100% { opacity: 0.1; }
`;

const RunwayButton = styled(IconButton)(({ delay = 0 }) => ({
    marginBottom: '-0.8em',
    animation: `${runwayAnimation} 3s infinite`,
    animationDelay: `${delay}s`,
}));
