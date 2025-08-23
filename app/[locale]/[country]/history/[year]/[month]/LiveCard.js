'use client'

import { useState, useMemo } from 'react';
import InnerLink from '@/components/InnerLink';
import { countries } from '@/utils/sources/countries';
import { getTypographyOptions } from '@/utils/typography/typography';
import { choose, checkRTL } from '@/utils/utils';
import { useFont, useTranslate } from '@/utils/store';

const randomFontIndex = Math.floor(Math.random() * 100);

export default function LiveCard({ country, locale }) {
    const translate = useTranslate((state) => state.translate);
    const storeFont = useFont((state) => state.font);
    
    // Get country name in appropriate language
    const countryName = locale === 'heb' ? countries[country].hebrew : countries[country].english;
    const liveText = locale === 'heb' ? ' - כותרות חיות' : '\nLive Headlines';
    const displayText = countryName + liveText;

    // Dynamic typography logic from ArchiveCard
    const shouldTranslate = useMemo(() => translate.includes('ALL'), [translate]);
    
    const isRTL = useMemo(() => checkRTL(displayText), [displayText]);
    
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
        <InnerLink 
            href={`/${locale}/${country}`}
            className="block"
        >
            <div className={`
                col-span-1 relative bg-[#223052] hover:bg-[#2a3a65] transition-colors duration-200 h-full
                ${isRTL ? 'direction-rtl' : 'direction-ltr'}
            `}>
                <div className="flex flex-col h-full justify-center items-center p-4">
                    <span 
                        className="text-lg text-center text-white"
                        style={{ 
                            ...typography, 
                            direction: isRTL ? 'rtl' : 'ltr',
                            display: 'block',
                            whiteSpace: 'pre-line',
                            textAlign: 'center',
                            color: 'white'
                        }}
                    >
                        {displayText}
                    </span>
                </div>
            </div>
        </InnerLink>
    );
}
