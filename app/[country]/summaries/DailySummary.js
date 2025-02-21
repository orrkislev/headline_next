import { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Collapse, IconButton, keyframes, styled } from '@mui/material';
import { useDate } from '@/components/TimeManager';
import { useData } from '@/components/DataManager';
import { add } from 'date-fns';
import { getHeadline, getSummaryContent } from '@/utils/daily summary utils';

export default function DailySummary() {
    const day = useDate((state) => state.date.toDateString());
    const dailySummaries = useData(state => state.dailySummaries);
    const [expanded, setExpanded] = useState(false);

    const dayString = add(new Date(day), { hours: 10 }).toISOString().split('T')[0]
    const dailySummary = dailySummaries.find(summary => summary.date == dayString);

    if (!dailySummary) return null;

    console.log(dailySummary)

    const headline = getHeadline(dailySummary, 'hebrew');
    const summaryContent = getSummaryContent(dailySummary, 'hebrew');

    return (
        <div className="bg-white pb-2 border-b border-gray-200">
            <div className='flex items-start justify-between relative cursor-pointer flex-row-reverse'
                onClick={() => setExpanded(p => !p)}
            >
                <div className='text-blue frank-re flex-1 pl-5 pr-0 text-right text-xl font-mono mb-8'>
                    <span>{dayString}</span>
                    <span> ⇠ </span>
                    <span>{headline}</span>
                </div>

                <div className={`absolute left-0 top-0 flex flex-col gap-[-0.5em]`}>
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
                <div className='frank-re leading-none font-normal mt-1 pl-6 pr-0'>
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
