'use client'

import { useState } from "react";
import Link from "next/link";
import { TopBarButton } from "@/components/IconButtons";
import { useParams } from "next/navigation";
import PopUpCleaner from "@/components/PopUp";
import FlagIcon from "@/components/FlagIcon";
import { countries } from "@/utils/sources/countries";


export default function Flag({ country, locale }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative z-[1000]">
            <div className="h-full flex items-center justify-center">
                <TopBarButton onClick={() => setOpen(!open)}>
                    <FlagIcon country={country} />
                </TopBarButton>
            </div>
            <FlagSelector {...{ country, open, locale }} close={() => setOpen(false)} />
        </div>
    );
}

function FlagSelector({ country, open, close, locale }) {
    if (!open) return null;

    return (
        <>
            <PopUpCleaner open={open} close={close} />
            <div className="absolute top-4 p-4 right-0 grid grid-cols-2 gap-4 bg-white rounded-md shadow-lg w-64 z-[1000]">
                {Object.keys(countries).map((c, i) => (
                    <Link key={i} href={`/${locale}/${c}`}>
                        <div key={i} className={`flex justify-start items-center gap-2 text-sm hover:bg-gray-100 px-2 rounded-md cursor-pointer ${c === country ? 'bg-gray-100' : ''}`}>
                            <FlagIcon country={c} />
                            {c}
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}