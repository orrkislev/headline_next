import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import ReadMore from './TopBar/ReadMore';
import PopUpCleaner from '@/components/PopUp';
import { countries } from '@/utils/sources/countries';
import { format, isToday } from 'date-fns';

export default function FirstVisitModal({ openAbout, country, locale, pageDate }) {
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        // Only show on first visit (per browser)
        if (typeof window !== 'undefined') {
            const seen = localStorage.getItem('seenFirstVisitModal');
            if (!seen) {
                setOpen(true);
                localStorage.setItem('seenFirstVisitModal', 'true');
            }
        }
    }, []);

    if (!open) return null;

    // Always use English country name, but use 'the US' for 'us'
    let countryName = countries[country]?.english || country;
    if (country === 'us') countryName = 'the US';
    let shortText;
    if (pageDate && !isToday(pageDate)) {
        const formattedDate = format(pageDate, 'MMMM d, yyyy');
        shortText = `This is an archive of the main headlines of many newspapers from ${countryName} on ${formattedDate}. <br/><br/> You can move back in time, or see the current headlines as they appear, using the slider on the side.`;
    } else {
        shortText = `These are the current main headlines of many newspapers from ${countryName}. You can navigate back in time with the slider on the side.`;
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleReadMore = () => {
        setOpen(false);
        if (openAbout) openAbout();
    };

    return (
        <>
            <PopUpCleaner close={handleClose} />
            <div 
                className={`fixed inset-0 flex items-center justify-center z-[1000] direction-ltr bg-black/20`}
                onClick={handleClose}
            >
                <div 
                    className="w-[400px] bg-white p-6 max-h-[80vh] overflow-auto shadow-xl border border-gray-100 rounded-xs"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#d1d5db transparent'
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="font-['Geist'] text-sm leading-6 mb-4" dangerouslySetInnerHTML={{ __html: shortText }} />
                    <video 
                        className="w-full mb-4 rounded-sm"
                        autoPlay
                        loop
                        muted
                        preload="metadata"
                    >
                        <source src="/landing/TheHear-Scroll-11s-700px.webm" type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </>
    );
} 