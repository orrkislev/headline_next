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
        if (nextSource) {
            setActiveWebsites([...activeWebsites, nextSource]);
            console.log(`Added source: ${nextSource}`);
        } else {
            console.log("No more sources to add");
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg cursor-pointer hover:bg-white hover:text-gray-500 transition-all transform  text-3xl hover:text-4xl min-h-32"
            onClick={handleAddSource}
        >
            <div>+</div>
        </div>
    );
} 