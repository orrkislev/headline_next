import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import ReadMore from './ReadMore';
import { useParams } from 'next/navigation';

const AboutMenu = ({ open }) => {
    const { locale } = useParams()
    const [expanded, setExpanded] = useState(false);
    const shortText = `⇢ <em>The Hear</em> is a newsstand with a brain: it displays the main headlines of many newspapers, side by side, in real-time and without curation. 
  </br>It is meant to exist quietly in the background, and let you monitor the news from a distance.`;

    if (!open) return null;

    return (
        <div className={`absolute top-16 z-50 ${locale === 'heb' ? 'right-0' : 'left-0'}`}>
            <div className="w-[400px] bg-white p-3 max-h-[80vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                <div className="font-roboto text-base leading-6 mb-2" dangerouslySetInnerHTML={{ __html: shortText }} />
                <Divider className="w-full mb-1" />
                <ReadMore expanded={expanded} onToggle={() => setExpanded(!expanded)} />
            </div>
        </div>
    );
};

export default AboutMenu;