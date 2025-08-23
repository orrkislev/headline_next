'use client'

import { useState, useMemo } from 'react';
import { getHeadline, getSummaryContent } from '@/utils/daily summary utils';
import { getTypographyOptions } from '@/utils/typography/typography';
import { choose, checkRTL } from '@/utils/utils';
import { createDateString } from '@/utils/utils';
import InnerLink from '@/components/InnerLink';
import { useFont, useTranslate } from '@/utils/store';
import CustomTooltip from '@/components/CustomTooltip';

const randomFontIndex = Math.floor(Math.random() * 100);

export default function ArchiveCard({ dailySummary, country, locale, font = 'random' }) {
    const [expanded, setExpanded] = useState(false);
    const translate = useTranslate((state) => state.translate);
    const storeFont = useFont((state) => state.font);
    
    if (!dailySummary) return null;

    const date = new Date(dailySummary.date);
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, '.');

    const headline = getHeadline(dailySummary, locale);
    const summaryContent = getSummaryContent(dailySummary, locale);
    const dateString = createDateString(date);
    
    const dayName = date.toLocaleDateString(locale === 'heb' ? 'he' : 'en', { 
        weekday: 'long' 
    });

    // Dynamic typography logic from SourceCard
    const shouldTranslate = useMemo(() => translate.includes('ALL'), [translate]);
    
    const isRTL = useMemo(() => checkRTL(headline), [headline]);
    
    const typography = useMemo(() => {
        let typo = storeFont;
        const options = getTypographyOptions(country).options;
        if (typeof storeFont === 'number') typo = options[storeFont % options.length];
        else if (storeFont == 'random') typo = choose(options);

        if ((typo.direction === 'rtl' && !isRTL) || (typo.direction === 'ltr' && isRTL)) {
            const otherOptions = getTypographyOptions(isRTL ? 'israel' : 'us').options;
            typo = otherOptions[randomFontIndex % otherOptions.length];
        }

        if (shouldTranslate) {
            const translatedOptions = getTypographyOptions(locale == 'heb' ? 'israel' : 'us').options;
            typo = translatedOptions[randomFontIndex % translatedOptions.length];
        }

        return typo;
    }, [storeFont, country, isRTL, shouldTranslate, locale]);

    return (
        <div className={`
            col-span-1 relative bg-neutral-100 hover:bg-white hover:shadow-xl transition-colors duration-200
            ${isRTL ? 'direction-rtl' : 'direction-ltr'}
        `}>
            <div className="flex flex-col h-full justify-normal sm:justify-between">
                <div className="flex flex-col gap-2 mb-2 p-4">
                    {/* Date header */}
                    <div className={`${locale === 'heb' ? 'text-right' : 'text-left'}`}>
                        <div className="flex items-center gap-2">
                            <div 
                                className="text-xs font-medium text-blue"
                                style={{ 
                                    fontFamily: 'monospace',
                                    fontWeight: 500
                                }}
                            >
                                {formattedDate}
                            </div>
                            <span className="text-gray-500">•</span>
                            <div 
                                className="text-xs font-normal text-gray-500"
                                style={{ 
                                    fontFamily: 'Geist, sans-serif',
                                    fontWeight: 400
                                }}
                            >
                                {dayName}
                            </div>
                            <span className="text-gray-500">•</span>
                            <div className="flex items-center flex-1">
                                <div className="flex-1 h-px bg-gray-300"></div>
                                <svg className="w-3 h-3 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Headline with dynamic typography from SourceCard */}
                    <InnerLink 
                        href={`/${locale}/${country}/${dateString}`}
                        className="hover:text-blue"
                    >
                        <h3 
                            className={`${isRTL ? 'text-right' : 'text-left'} w-full text-lg font-semibold break-words line-clamp-6`}
                            style={{ 
                                ...typography, 
                                width: '100%', 
                                direction: isRTL ? 'rtl' : 'ltr'
                            }}
                        >
                            {headline}
                        </h3>
                    </InnerLink>
                </div>

                <div>
                    {/* Summary section */}
                    <div className="px-4 pb-4">
                        <div className="flex items-start gap-2">
                            <CustomTooltip title={locale === 'heb' ? 'סקירה יומית זו נכתבה בידי בינה' : 'This daily overview was written by an AI'} placement={locale === 'heb' ? 'top' : 'top'}>
                                <span className="cursor-help text-sm text-gray-400 mt-1.5" tabIndex={0}>⌨</span>
                            </CustomTooltip>
                            <div 
                                style={{
                                    fontFamily: locale === 'heb' ? '' : 'Geist, sans-serif',
                                    padding: 6,
                                    direction: locale === 'heb' ? 'rtl' : 'ltr',
                                    textAlign: locale === 'heb' ? 'right' : 'left',
                                    fontSize: '0.75rem',
                                    color: '#374151',
                                    lineHeight: '1.4',
                                    overflow: expanded ? 'auto' : 'hidden',
                                    display: expanded ? 'block' : '-webkit-box',
                                    WebkitLineClamp: expanded ? 'none' : 3,
                                    WebkitBoxOrient: 'vertical',
                                    maxHeight: expanded ? '200px' : 'none',
                                    marginBottom: expanded ? '8px' : '0',
                                    flex: 1
                                }}
                            >
                                <span dangerouslySetInnerHTML={{ __html: summaryContent }} />
                            </div>
                        </div>
                        
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className={`
                                text-gray-600 hover:text-gray-800 mt-2 transition-colors mx-auto block
                            `}
                            style={{
                                position: 'relative',
                                zIndex: 1
                            }}
                        >
                            <svg 
                                className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}