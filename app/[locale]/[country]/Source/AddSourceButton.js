import getSourceOrder from "@/utils/sources/source orders";

export default function AddSourceButton({country, activeWebsites, setActiveWebsites, order}) {
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