'use client'

import useWebsites from "@/utils/useWebsites";

export default function AddSourceButton({ locale, country }) {
    const { websites, addNextWebsite } = useWebsites(country, locale);
    return (
        <div className="order-last flex items-center justify-center bg-neutral-100 text-gray-400 rounded-lg cursor-pointer hover:bg-white hover: transition-all transform text-3xl min-h-32 hover:shadow-xl"
            onClick={addNextWebsite}
        >
            <div>+</div>
        </div>
    );
} 