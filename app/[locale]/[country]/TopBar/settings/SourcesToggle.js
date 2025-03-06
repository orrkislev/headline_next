'use client'

import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import PopUpCleaner from "@/components/PopUp";
import getSourceDescription from "@/utils/sources/source descriptions";
import { getSourceName } from "@/utils/sources/source mapping";
import getSourceOrder from "@/utils/sources/source orders";
import { useActiveWebsites, useOrder } from "@/utils/store";
import { List } from "@mui/icons-material";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";


export default function SourcesToggle({ country, locale }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <PopUpCleaner open={open} close={() => setOpen(false)} />
            <div className="relative">
                <CustomTooltip title="Select news sources" placement="left">
                    <TopBarButton onClick={() => setOpen(p => !p)}>
                        <List />
                    </TopBarButton>
                </CustomTooltip>
                <SourcesGrid {...{ open, country, locale }} />
            </div>
        </>
    );
}

function SourcesGrid({ open, country, locale }) {
    const searchParams = useSearchParams();
    const websites = searchParams.get('websites')?.split(',') || [];
    const order = useOrder(state => state.order);
    // const { activeWebsites, setActiveWebsites } = useActiveWebsites()

    const setActiveWebsites = (newWebsites) => {
        const url = `/${locale}/${country}?websites=${newWebsites.join(',')}`;
        redirect(url);
    }

    const sourceOrder = useMemo(() => getSourceOrder(country, order), [country, order]);

    const orderedSources = sourceOrder.map(id => ({
        id,
        description: getSourceDescription(country, id),
        active: websites.includes(id),
        name: getSourceName(country, id),
        // sum: sources[id] ? sources[id].filter(headline => headline.timestamp.toDateString() === day).length : 0,
        sum: 0,
        // website: sources[id] ? sources[id][0].link : '',
        website: 'www.google.com'
    }));

    if (!open) return null;
    return (
        <div className={`absolute top-8 ${locale === 'heb' ? 'left-0' : 'right-0'} bg-white rounded-lg shadow-lg p-4 h-[65vh] w-[40vw] overflow-y-auto direction-ltr z-[1000]`}>
            <table className="border border-gray-300 text-sm">
                <thead className="border-b border-gray-300">
                    <tr className="text-left">
                        <th className="p-2">Active</th>
                        <th className="p-2">Source</th>
                        <th className="p-2">Today</th>
                        <th className="p-2">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {orderedSources.map((source, i) => (
                        <tr key={source.id} className="border-b border-gray-300">
                            <td className='mt-8 p-4'>
                                <input
                                    type="checkbox"
                                    checked={source.active}
                                    onChange={() => {
                                        const updatedWebsites = source.active
                                            ? websites.filter(id => id !== source.id)
                                            : [...websites, source.id];
                                        setActiveWebsites(updatedWebsites);
                                    }}
                                />
                            </td>
                            <td className="mt-8 p-2 ">
                                <div className="flex items-center gap-2">
                                    <Image src={`https://www.google.com/s2/favicons?sz=64&domain=${source.website}`}
                                        width={16} height={16} alt=""
                                        style={{ verticalAlign: 'middle' }}
                                    />
                                    {source.name}
                                </div>
                            </td>
                            <td className="mt-8 p-2">{source.sum}</td>
                            <td className="mt-8 p-2">{source.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}