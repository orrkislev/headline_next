export function LabeledContent({ label, children }) {
    return (
        <div className="flex flex-col items-center w-fit min-w-max px-4">
            <div className="h-[34px] flex items-center">
                {children}
            </div>
            <p className="text-[0.7rem] font-roboto text-[#9A9A9A] px-1 -mt-1 mb-1">
                {label}
            </p>
        </div>
    );
}

export default function LabeledIcon({ label, icon }) {
    return <LabeledContent label={label}>
        {icon}
    </LabeledContent>
}

