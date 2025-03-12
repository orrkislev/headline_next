'use client'

import useWebsites from "@/utils/useWebsites";

export default function AddSourceButton({ country, sources }) {
    const { addNextWebsite } = useWebsites(country);

    return (
        <div className="order-last col-span-1 flex items-center justify-center bg-neutral-100 text-gray-400 rounded-lg cursor-pointer hover:bg-white hover: transition-all transform text-3xl hover:shadow-xl min-h-[200px]"
            onClick={addNextWebsite}
        >
            <div className="animate-pulse">+</div>
        </div>
    );
} 