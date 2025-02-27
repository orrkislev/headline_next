import { XIcon } from "lucide-react";

export default function CloseButton({ sourceName, activeWebsites, setActiveWebsites }) {
    const handleClick = () => {
        setActiveWebsites(activeWebsites.filter(website => website !== sourceName));
    }

    return (
        <div className="close-button absolute top-4 left-4 p-2 transition-all opacity-0 duration-100 cursor-pointer hover:opacity-100 text-neutral-500 hover:text-neutral-800 transition-colors"
            onClick={handleClick}>
            <XIcon size="18" />
        </div>
    );
}