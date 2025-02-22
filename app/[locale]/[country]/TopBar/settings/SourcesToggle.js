import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { usePreferences } from "@/components/PreferencesManager";
import getSourceDescription from "@/utils/sources/source descriptions";
import { getSourceName } from "@/utils/sources/source mapping";
import getSourceOrder from "@/utils/sources/source orders";
import { List } from "@mui/icons-material";
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
    const { country } = useParams();
    const locale = usePreferences(state => state.locale);
    const order = usePreferences(state => state.order);
    const activeWebsites = usePreferences(state => state.activeWebsites);
    const setActiveWebsites = usePreferences(state => state.setActiveWebsites);

    const sourceOrder = useMemo(() => getSourceOrder(country, order), [country, order]);
    const orderedSources = sourceOrder.map(id => ({ id, description: getSourceDescription(country, id) }));
    orderedSources.forEach(source => {
        source.active = activeWebsites.includes(source.id);
        source.name = getSourceName(country, source.id);
    });

    if (!open) return null;
    return (
        <div className={`absolute top-8 ${locale === 'heb' ? 'left-0' : 'right-0'} bg-white rounded-lg shadow-lg p-4 h-[65vh] w-[40vw] overflow-y-auto direction-ltr`}>
            <table className="border border-gray-300 text-sm">
                <thead className="border-b border-gray-300">
                    <tr className="text-left">
                        <th className="p-2">Active</th>
                        <th className="p-2">Source</th>
                        <th className="p-2">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {orderedSources.map((source, i) => (
                        <tr key={source.id}>
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
                            <td className="mt-8 p-2">{source.name}</td>
                            <td className="mt-8 p-2">{source.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}