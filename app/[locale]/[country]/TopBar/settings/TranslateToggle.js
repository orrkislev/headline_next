'use client';

import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { useTranslate } from "@/utils/store";
import { Translate } from "@mui/icons-material";
import { useEffect } from "react";


const englishSpeakingCountries = ['us','canada','australia','uk','ireland','new zealand','south africa'];
const hebrewSpeakingCountries = ['israel'];

export default function TranslateToggle({ locale, country }) {
    const { setTranslate } = useTranslate();

    useEffect(()=>{
        if (locale === 'en' && !englishSpeakingCountries.includes(country) && !hebrewSpeakingCountries.includes(country)) {
            setTranslate('ALL');
        } else if (locale === 'heb' && !hebrewSpeakingCountries.includes(country) && !englishSpeakingCountries.includes(country)) {
            setTranslate('ALL');
        }
    },[locale,country])

    const handleClick = () => {
        setTranslate('ALL');
    }
    return (
        <CustomTooltip title="Translate" placement="bottom">
            <TopBarButton onClick={handleClick}>
                <Translate />
            </TopBarButton>
        </CustomTooltip>
    );
}