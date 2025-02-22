import CustomTooltip from "@/components/CustomTooltip";
import { useData } from "@/components/DataManager";
import { TopBarButton } from "@/components/IconButtons";
import { usePreferences } from "@/components/PreferencesManager";
import { useDate } from "@/components/TimeManager";
import getSourceDescription from "@/utils/sources/source descriptions";
import { getSourceName } from "@/utils/sources/source mapping";
import getSourceOrder from "@/utils/sources/source orders";
import { List } from "@mui/icons-material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";


export default function SourcesToggle() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <CustomTooltip title="Select news sources" placement="left">
                <TopBarButton onClick={() => setOpen(p => !p)}>
                    <List />
                </TopBarButton>
            </CustomTooltip>
            <SourcesGrid open={open} />
        </div>
    );
}

function SourcesGrid({ open }) {
    const { country, locale } = useParams();
    const day = useDate(state => state.date.toDateString());
    const sources = useData(state => state.sources);
    const order = usePreferences(state => state.order);
    const activeWebsites = usePreferences(state => state.activeWebsites);
    const setActiveWebsites = usePreferences(state => state.setActiveWebsites);

    const sourceOrder = useMemo(() => getSourceOrder(country, order), [country, order]);
    const orderedSources = sourceOrder.map(id => ({
        id,
        description: getSourceDescription(country, id),
        active: activeWebsites.includes(id),
        name: getSourceName(country, id),
        sum: sources[id] ? sources[id].filter(headline => headline.timestamp.toDateString() === day).length : 0,
        website: sources[id] ? sources[id][0].link : '',
    }));

    if (!open) return null;
    return (
        <div className={`absolute top-8 ${locale === 'heb' ? 'left-0' : 'right-0'} bg-white rounded-lg shadow-lg p-4 h-[65vh] w-[40vw] overflow-y-auto direction-ltr`}>
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
                                            ? activeWebsites.filter(id => id !== source.id)
                                            : [...activeWebsites, source.id];
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