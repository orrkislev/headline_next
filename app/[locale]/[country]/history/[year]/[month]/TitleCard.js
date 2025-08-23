'use client'

import { useState, useMemo } from 'react';
import InnerLink from '@/components/InnerLink';
import { countries } from '@/utils/sources/countries';
import { getTypographyOptions } from '@/utils/typography/typography';
import { choose, checkRTL } from '@/utils/utils';
import { useFont, useTranslate } from '@/utils/store';

const randomFontIndex = Math.floor(Math.random() * 100);

export default function TitleCard({ country, locale, year, month }) {
    const translate = useTranslate((state) => state.translate);
    const storeFont = useFont((state) => state.font);
    
    const currentMonth = parseInt(month);
    const currentYear = parseInt(year);
    
    // Get current month name
    const currentMonthName = new Date(currentYear, currentMonth - 1).toLocaleDateString(
        locale === 'heb' ? 'he' : 'en', 
        { month: 'long' }
    );

    // Dynamic typography logic from ArchiveCard
    const shouldTranslate = useMemo(() => translate.includes('ALL'), [translate]);
    
    const isRTL = useMemo(() => checkRTL(currentMonthName), [currentMonthName]);
    
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
            col-span-1 relative bg-white
            ${isRTL ? 'direction-rtl' : 'direction-ltr'}
        `}>
            <div className="flex flex-col h-full justify-center items-center p-4">
                <span 
                    className="text-lg whitespace-nowrap"
                    style={{ 
                        ...typography, 
                        direction: isRTL ? 'rtl' : 'ltr',
                        display: 'inline'
                    }}
                >
                    {currentMonthName}
                </span>
            </div>
        </div>
    );
}
