'use client';

import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { useTranslate } from "@/utils/store";
import { Translate } from "@mui/icons-material";
import { useEffect, useState } from "react";


const englishSpeakingCountries = ['us', 'canada', 'australia', 'uk', 'ireland', 'new zealand', 'south africa'];
const hebrewSpeakingCountries = ['israel'];
const allCountries = [...englishSpeakingCountries, ...hebrewSpeakingCountries];

export default function TranslateToggle({ locale, country, sources, userCountry }) {
    const translate = useTranslate(state => state.translate);
    const setTranslate = useTranslate(state => state.setTranslate);
    const [on, setOn] = useState(false);

    // Initialize translation state based on country and user location
    useEffect(() => {
        if (!allCountries.includes(country) && userCountry !== country) {
            setTranslate(Object.keys(sources));
        }
    }, [locale, country, sources, setTranslate, userCountry]);

    // Sync the toggle state with the actual translation state
    useEffect(() => {
        // If any sources are being translated, the toggle should be on
        setOn(translate.length > 0);
    }, [translate]);

    const handleClick = () => {
        setTranslate(on ? [] : Object.keys(sources));
        setOn(!on);
    }
    
    return (
        <CustomTooltip title="Translate" placement="bottom">
            <TopBarButton onClick={handleClick}>
                <Translate sx={{ color: on ? '#0000FF' : '' }} />
            </TopBarButton>
        </CustomTooltip>
    );
}