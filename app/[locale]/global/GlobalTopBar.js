import { GlobalTimeDisplay } from "../[country]/TopBar/TimeDisplay";

export default function GlobalTopBar() {
    return (
        <div className="flex border-b border-gray-200 p-4">
            <div className="flex justify-between w-full">
                <div className="flex items-center">
                    <GlobalTimeDisplay />
                </div>
                <div className="flex gap-4 items-center hidden md:flex">
                    {/* <Global />
                    <Info />
                    <SettingsButton /> */}
                </div>
            </div>
        </div>
    );
}