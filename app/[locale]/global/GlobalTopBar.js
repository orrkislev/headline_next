import Clock from "@/components/Clock";

export default function GlobalTopBar({ locale }) {
    return (
        <div className="flex border-b border-gray-200 p-4">
            <div className="flex justify-between w-full">
                <div className="flex items-center">
                    <Clock locale={locale} />
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