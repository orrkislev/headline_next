'use client'

import { redirect } from "next/navigation";

import getSourceOrder from "@/utils/sources/source orders";
import useWebsites from "@/utils/useWebsites";

export default function AddSourceButton({ locale, country }) {
    const { websites, addNextWebsite } = useWebsites(country, locale);
    // const order = useOrder(state => state.order);
    const order = 'default'

    return (
        <div className="flex items-center justify-center bg-neutral-100 text-gray-400 rounded-lg cursor-pointer hover:bg-white hover: transition-all transform text-3xl min-h-32 hover:shadow-xl"
            onClick={addNextWebsite}
        >
            <div>+</div>
        </div>
    );
} 