import TimeDisplay from "./TimeDisplay.js";
import { Global, Info, SettingsButton } from "./TopBarParts.js";
import Flag from "./Flag.js";
import { TopBarHeadline } from "./TopBarHeadline.js";


export default function TopBar() {

    return (
        <div className="flex border-b border-gray-200 p-4">
            <div className="flex justify-between w-full">
                <div className="flex items-center">
                    <TimeDisplay />
                    <div className="border-l-2 border-gray-300 h-full mx-2"></div>
                    <Flag />
                    <div className="border-l-2 border-gray-300 h-full mx-2"></div>
                    <TopBarHeadline />
                </div>
                <div className="flex gap-4 items-center hidden md:flex">
                    <Global />
                    <Info />
                    <SettingsButton />
                </div>
            </div>
        </div>
    );
}

