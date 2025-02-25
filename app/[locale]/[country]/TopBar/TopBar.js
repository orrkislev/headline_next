import TimeDisplay from "./TimeDisplay.js";
import { SettingsButton } from "./TopBarParts.js";
import Flag from "./Flag.js";
// import { TopBarHeadline } from "./TopBarHeadline.js";

export default function TopBar() {
    return (
        <div className="flex border-b border-gray-200 px-2">
            <div className="flex justify-between w-full">
                <div className="flex items-center">
                    <TimeDisplay />
                    <div className="border-l border-gray-300 h-full mx-5"></div>
                    <Flag />
                    {/* <div className="border-l border-gray-300 h-full mx-5"></div> */}
                    {/* <TopBarHeadline initialSummaries={initialSummaries} locale={locale} /> */}
                </div>
                <div className="flex items-center hidden md:flex">
                    <SettingsButton />
                </div>
            </div>
        </div>
    );
}

