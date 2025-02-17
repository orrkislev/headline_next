'use client'

import { useEffect, useState } from "react";
import SourceSlider from "./SourceSlider";

export default function SourceCard({ headlines }) {
    const [headline, setHeadline] = useState()

    // useEffect(() => {
    //     if (headlines.length > 0)
    //         setHeadline(headlines[0])
    // }, [headlines])

    return (
        <div className="shadow p-4 rounded-md">
            <div>{headlines.length} - {headlines[0].website_id}</div>
            <div className="text-lg font-semibold">
                {headline ? headline.headline : 'No headlines'}
            </div>
            <SourceSlider source={headlines} setHeadline={setHeadline} />
        </div>
    );
}