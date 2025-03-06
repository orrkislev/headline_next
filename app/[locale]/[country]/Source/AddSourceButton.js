'use client'

import { redirect } from "next/navigation";

import getSourceOrder from "@/utils/sources/source orders";

export default function AddSourceButton({ locale, country, websites }) {
    // const order = useOrder(state => state.order);
    const order = 'default'

    const handleAddSource = () => {
        const sourceOrder = getSourceOrder(country, order);
        const nextSource = sourceOrder.find((source) => !websites.includes(source));
        if (nextSource) {
            const newWebsite = [...websites, nextSource];
            const url = `/${locale}/${country}?websites=${newWebsite.join(',')}`;
            redirect(url);
        }
    };

    return (
        <div className="flex items-center justify-center bg-neutral-100 text-gray-400 rounded-lg cursor-pointer hover:bg-white hover: transition-all transform text-3xl min-h-32 hover:shadow-xl"
            onClick={handleAddSource}
        >
            <div>+</div>
        </div>
    );
} 