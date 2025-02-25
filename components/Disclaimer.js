'use client'

import { useParams } from "next/navigation";

export default function Disclaimer() {
    const { locale } = useParams()
    return (
        <div className={`text-gray-400 pt-4 border-t border-gray-200 text-[0.9rem] ${locale === 'en' ? 'font-roboto' : 'frank-re'}`}>
            {locale === 'heb' ? 'סקירות אלו נכתבו על ידי הבינה' : 'These overviews were written by an AI'}
        </div>
    );
}
