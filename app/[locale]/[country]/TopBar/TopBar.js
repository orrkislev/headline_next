import TimeDisplay from "./TimeDisplay.js";
import Flag from "./Flag.js";
import { SettingsButton } from "./SettingsButton.js";

export default function TopBar({ date, locale, setDate, country, font, setFont, view, setView, order, setOrder, sources, activeWebsites, setActiveWebsites }) {
    return (
        <div className="flex border-b border-gray-200 px-2 py-2">
            <div className="flex justify-between w-full">
                <div className="flex items-center">
                    <TimeDisplay date={date} locale={locale} />
                    <div className="border-l border-gray-300 h-full mx-5"></div>
                    <Flag />
                </div>
                <div className="flex items-center hidden md:flex">
                    <SettingsButton {...{ locale, date, setDate, country, font, setFont, view, setView, order, setOrder, sources, activeWebsites, setActiveWebsites }} />
                </div>
            </div>
        </div>
    );
}

