import TimeDisplay from "./TimeDisplay.js";
import Flag from "./Flag.js";
import { SettingsButton } from "./SettingsButton.js";

export default function TopBar({ locale, country, sources}) {
    return (
        <div className="flex border-b border-gray-200 px-2 py-1">
            <div className="flex justify-between w-full">
                <div className="flex items-center">
                    <TimeDisplay locale={locale} />
                    <div className="border-l border-gray-300 h-full mx-5"></div>
                    <Flag {...{ country, locale}} />
                </div>
                <div className="flex items-center hidden md:flex px-2">
                    <SettingsButton {...{ locale, country, sources}} />
                </div>
            </div>
        </div>
    );
}

