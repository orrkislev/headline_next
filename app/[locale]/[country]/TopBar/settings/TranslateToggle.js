'use client';

import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { useTranslate } from "@/utils/store";
import { Translate } from "@mui/icons-material";
import { useEffect, useState } from "react";


const englishSpeakingCountries = ['us', 'canada', 'australia', 'uk', 'ireland', 'new zealand', 'south africa'];
const hebrewSpeakingCountries = ['israel'];
const allCountries = [...englishSpeakingCountries, ...hebrewSpeakingCountries];

export default function TranslateToggle({ locale, country, sources }) {
    const setTranslate= useTranslate(state => state.setTranslate)
    const [on, setOn] = useState(false)

    useEffect(() => {
        if (!allCountries.includes(country)) setTranslate(Object.keys(sources))
    }, [locale, country])

    const handleClick = () => {
        setTranslate(on ? [] : Object.keys(sources))
        setOn(!on)
    }
    return (
        <CustomTooltip title="Translate" placement="bottom">
            <TopBarButton onClick={handleClick}>
                <Translate color={on ? 'primary' : ''} />
            </TopBarButton>
        </CustomTooltip>
    );
}