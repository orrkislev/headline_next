'use client'

import Image from "next/image";
import { countryToAlpha2 } from "country-to-iso";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TopBarButton } from "@/components/IconButtons";
import { useParams } from "next/navigation";


export default function Flag() {
    const { country } = useParams()
    const [open, setOpen] = useState(false);
    return (
        <div className="relative z-[1000]">
            <div className="px-4 h-full flex items-center justify-center">
                <TopBarButton onClick={() => setOpen(!open)}>
                    <FlagIcon country={country} />
                </TopBarButton>
            </div>
            <FlagSelector country={country} open={open} />
        </div>
    );
}

function FlagSelector({ country, open }) {
    const { locale } = useParams()
    const [countries, setCountries] = useState(null);

    useEffect(() => {
        const doStuff = async () => {
            const res = await fetch('/countries.json');
            const data = await res.json();
            setCountries(data);
        }
        doStuff();
    }, [])

    if (!countries || !open) return null;

    return (
        <div className="absolute top-4 p-4 right-0 grid grid-cols-2 gap-4 bg-white rounded-md shadow-lg w-64">
            {countries.map((c, i) => (
                <Link key={i} href={`/${locale}/${c}`}>
                    <div key={i} className={`flex justify-start items-center gap-2 text-sm hover:bg-gray-100 px-2 rounded-md cursor-pointer ${c === country ? 'bg-gray-100' : ''}`}>
                        <FlagIcon country={c} />
                        {c}
                    </div>
                </Link>
            ))}
        </div>
    );
}



const getFlagUrl = (country, size = '16x12') => {
    const isoCountry = countryToAlpha2(country).toLowerCase();
    if (!isoCountry) return '';
    return `https://flagcdn.com/${size}/${isoCountry}.png`;
};

function FlagIcon({ country }) {
    const flagUrl = getFlagUrl(country);
    return (
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
    )
}