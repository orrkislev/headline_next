import CustomTooltip from "@/components/CustomTooltip";

export function LabeledContent({ label, children, clickable = true, tooltip }) {
    const labelElement = (
        <p className={`text-sm font-semibold font-roboto text-gray-800 my-2 select-none ${clickable ? 'cursor-pointer' : ''}`} onClick={clickable ? (e) => {
            e.stopPropagation();
            const button = e.currentTarget.parentElement.querySelector('button');
            if (button) {
                button.click();
            }
        } : undefined}>
            {label}
        </p>
    );

    return (
        <div className="flex items-center gap-1 px-4 direction-ltr">
            <div className="flex items-center">
                {children}
            </div>
            {tooltip ? (
                <CustomTooltip title={tooltip} placement="bottom" arrow>
                    {labelElement}
                </CustomTooltip>
            ) : (
                labelElement
            )}
        </div>
    );
}

export default function LabeledIcon({ label, icon, clickable = true, tooltip }) {
    return <LabeledContent label={label} clickable={clickable} tooltip={tooltip}>
        {icon}
    </LabeledContent>
}

