import { countryToAlpha2 } from "country-to-iso";
import { EarthIcon, InfoIcon, SettingsIcon } from "lucide-react";
import Image from "next/image";

export const getFlagUrl = (country, size = '16x12') => {
    const isoCountry = countryToAlpha2(country).toLowerCase();
    if (!isoCountry) return '';
    return `https://flagcdn.com/${size}/${isoCountry}.png`;
};

export function Flag({ country }) {
    const flagUrl = getFlagUrl(country);
    return (
        <div className="px-4 h-full flex items-center justify-center">
            <Image
                src={flagUrl}
                alt={`Flag of ${country}`}
                width={16}
                height={12}
                style={{
                    width: '1rem',
                    height: '0.75rem',
                    verticalAlign: 'middle',
                    cursor: 'pointer'
                }}
            />
        </div>
    );
}

export function Headline({ headline }) {
    return (
        <div className="h-full px-4 text-lg font-semibold">{headline}</div>
    );
}

export function Global() {
    return (
        <EarthIcon size={24} />
    );
}

export function Info() {
    return (
        <InfoIcon size={24} />
    );
}

export function Settings() {
    return (
        <SettingsIcon size={24} />
    );
}