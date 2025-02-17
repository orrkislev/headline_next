import { countryToAlpha2 } from "country-to-iso";
import { EarthIcon, InfoIcon, SettingsIcon } from "lucide-react";
import Image from "next/image";
import TimeDisplay from "./TimeDisplay";

export default function TopBar({ country, summary }) {

    const headline = summary.headline || summary.englishHeadline || summary.hebrewHeadline;

    return (
        <div className="flex gap-4 border-b border-gray-200 p-4">
            <div className="flex justify-between w-full">
                <div className="flex gap-4 items-center divide-x-2 divide-gray-200 divide-x-reverse">
                    <TimeDisplay />
                    <Flag country={country} />
                    <Headline headline={headline} />
                </div>
                <div className="flex gap-4 items-center divide-x-2 divide-gray-200">
                    <Global />
                    <Info />
                    <Settings />
                </div>
            </div>
        </div>
    );
}

export const getFlagUrl = (country, size = '16x12') => {
    const isoCountry = countryToAlpha2(country).toLowerCase();
    if (!isoCountry) return '';
    return `https://flagcdn.com/${size}/${isoCountry}.png`;
};

async function Flag({ country }) {
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

function Headline({ headline }) {
    return (
        <div className="h-full px-4 text-lg font-semibold">{headline}</div>
    );
}

function Global() {
    return (
        <EarthIcon size={24} />
    );
}

function Info() {
    return (
        <InfoIcon size={24} />
    );
}

function Settings() {
    return (
        <SettingsIcon size={24} />
    );
}