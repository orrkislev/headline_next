import { usePreferences } from "@/components/PreferencesManager";
import getSourceOrder from "@/utils/sources/source orders";
import { useParams } from "next/navigation";

export default function AddSourceButton() {
    const {country} = useParams();
    const activeWebsites = usePreferences((state) => state.activeWebsites);
    const setActiveWebsites = usePreferences((state) => state.setActiveWebsites);
    const order = usePreferences((state) => state.order);

    const sourceOrder = getSourceOrder(country, order);
    const nextSource = sourceOrder.find((source) => !activeWebsites.includes(source));

    const handleAddSource = () => {
        if (nextSource) setActiveWebsites([...activeWebsites, nextSource]);
    };

    return (
        <div className="flex items-center justify-center bg-neutral-100 text-gray-400 rounded-lg cursor-pointer hover:bg-white hover: transition-all transform text-3xl min-h-32 hover:shadow-xl"
            onClick={handleAddSource}
        >
            <div>+</div>
        </div>
    );
} 