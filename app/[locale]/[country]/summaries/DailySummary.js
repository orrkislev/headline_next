import { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Collapse, IconButton, keyframes, styled } from '@mui/material';
import { useDate } from '@/components/TimeManager';
import { useData } from '@/components/DataManager';
import { add } from 'date-fns';
import { getHeadline, getSummaryContent } from '@/utils/daily summary utils';

export default function DailySummary({ locale }) {
    const day = useDate((state) => state.date.toDateString());
    const dailySummaries = useData(state => state.dailySummaries);
    const [expanded, setExpanded] = useState(false);

    if (!dailySummaries) return null

    const dayString = add(new Date(day), { hours: 1 }).toISOString().split('T')[0]
    const dailySummary = dailySummaries.find(summary => summary.date == dayString);


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
        <div className="bg-white pb-2 border-b border-gray-200">
            <div className='flex items-start justify-between relative cursor-pointer flex-row-reverse'
                onClick={() => setExpanded(p => !p)}
            >
                <div className={`text-blue flex-1 pl-2 pr-2 ${locale === 'heb' ? 'pl-8' : 'pr-12'} mb-2 text-[1.5rem] ${locale === 'heb' ? 'frank-re' : 'font-roboto'}`} style={locale === 'heb' ? { lineHeight: '1.5' } : {}}>
                    <span className="font-mono">{formattedDate}</span>
                    <span> {locale === 'heb' ? ' ⇠ ' : ' ⇢ '}</span>
                    <span>{headline}</span>
                </div>

                <div className={`absolute top-0 flex flex-col gap-[-0.5em] ${locale === 'heb' ? 'left-0' : 'right-0'}`}>
                    {expanded ? (
                        <KeyboardArrowUp sx={{ color: 'blue' }} />
                    ) : [0, 1, 2].map((index) => (
                        <RunwayButton key={index} size="small" delay={index * 0.15} >
                            <KeyboardArrowDown sx={{ color: 'blue', padding: 0 }} />
                        </RunwayButton>
                    ))
                    }
                </div>
            </div>
            <Collapse in={expanded}>
                <div className={`custom-scrollbar max-h-[45vh] leading-none font-normal mt-1 ${locale === 'heb' ? 'pl-4 pr-2' : 'pl-2 pr-4'} text-[17px] ${locale === 'heb' ? 'frank-re' : 'font-roboto'}`} style={{ lineHeight: '1.3', }}>
                    <div dangerouslySetInnerHTML={{ __html: summaryContent }} />
                </div>
            </Collapse>
        </div>
    );
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
