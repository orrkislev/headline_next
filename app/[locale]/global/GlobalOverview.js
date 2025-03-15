'use client'

import React from 'react';
import { Skeleton } from '@mui/material';
import useGlobalOverviews from '@/utils/database/useGlobalOverview';

export default function GlobalOverview({ locale }) {
    const overview = useGlobalOverviews(locale);

    if (!overview) {
        return (
            <div className="px-2 mb-2">
                <Skeleton variant="text" width="90%" height={30} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="85%" height={24} />
                <Skeleton variant="text" width="80%" height={24} />
            </div>
        );
    }

    // Format timestamp
    let formattedTime = overview.timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const formatText = (text) => {
        // Split text by HTML break tags and parenthetical content
        const parts = text.split(/(<\/?br\s*\/?>|\(.*?\))/g).filter(Boolean);

        const formatTitleSection = (text) => {
            // Match pattern: start of string or after line break, followed by "WORD WORD: "
            const titleMatch = text.match(/^([^:]+):\s(.+)/);
            if (titleMatch) {
                return (
                    <>
                        <div className="text-blue-600 inline font-normal text-[1.125rem]">
                            ⇢ {titleMatch[1]}:
                        </div>
                        {" " + titleMatch[2]}
                    </>
                );
            }
            return text;
        };

        return parts.map((part, index) => {
            if (part.match(/<\/?br\s*\/?>/)) {
                // Get the next part and handle title if present
                const nextPart = parts[index + 1];
                if (nextPart) {
                    parts[index + 1] = nextPart.replace(/^\s+/, '');
                }
                return <div key={`break-${index}`} className="mb-4" />;
            }

            if (part.startsWith('(') && part.endsWith(')')) {
                return (
                    <div
                        key={`parenthesis-${index}`}
                        className="text-[#757575] text-[0.9rem] inline"
                    >
                        {part}
                    </div>
                );
            }

            // Check if this is the first part or follows a line break
            if (index === 0 || parts[index - 1].match(/<\/?br\s*\/?>/)) {
                return <React.Fragment key={`text-${index}`}>
                    {formatTitleSection(part)}
                </React.Fragment>;
            }

            return <React.Fragment key={`text-${index}`}>{part}</React.Fragment>;
        });
    };

    return (
        <div className="px-2 mb-2 custom-scrollbar overflow-auto">
            <div className={`text-blue mb-8 leading-tight font-normal ${locale === 'heb' ? 'frank-re' : 'font-roboto'} text-[1.25rem]`}>
                {formattedTime} ⇢ {overview.headline}
            </div>

            {/* Gentle divider */}
            <div className="mb-8 border-b border-black/20" />

            {/* Overview Text */}
            <div className={`${locale == 'heb' ? 'frank-re' : 'font-roboto'} text-[1.125rem] leading-[1.3] font-normal text-black whitespace-pre-wrap`}>
                {formatText(overview.overview)}
            </div>
        </div>
    );
};
