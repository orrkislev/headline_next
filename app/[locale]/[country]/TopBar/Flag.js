'use client'

import { useState } from "react";
import { TopBarButton } from "@/components/IconButtons";
import PopUpCleaner from "@/components/PopUp";
import FlagIcon from "@/components/FlagIcon";
import { countries } from "@/utils/sources/countries";
import InnerLink from "@/components/InnerLink";


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
            <div className={`absolute top-10 p-4 ${locale === 'heb' ? 'right-0' : 'left-0'} bg-white rounded-xs shadow-lg w-[18rem] z-[1000] font-['Geist'] text-sm`} dir="ltr">
                <div className="grid grid-cols-2 gap-[1px] bg-gray-200">
                    {Object.keys(countries).map((c, i) => (
                        <InnerLink key={i} locale={locale} href={`/${locale}/${c}`}>
                            <div className={`flex justify-start items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer ${c === country ? 'bg-gray-50' : 'bg-white'}`}>
                                <FlagIcon country={c} />
                                {countries[c].english}
                            </div>
                        </InnerLink>
                    ))}
                    {/* Add empty white cell if odd number of countries */}
                    {Object.keys(countries).length % 2 !== 0 && (
                        <div className="bg-white"></div>
                    )}
                </div>
            </div>
        </>
    );
}