'use client'

import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { SettingsRounded } from "@mui/icons-material";
import dynamic from "next/dynamic";
import { useState } from "react";

const Settings = dynamic(() => import("./settings/Settings"));

export function SettingsButton({ locale, country }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex items-center">
            <CustomTooltip title="Settings" arrow>
                <TopBarButton size="small" onClick={() => setOpen(prev => !prev)}>
                    <SettingsRounded />
                </TopBarButton>
            </CustomTooltip>
            <div className={`transition-all duration-300 ease-in-out ${open ? 'w-auto opacity-100 ml-4' : 'w-0 opacity-0 ml-0'}`}>
                <Settings {...{ locale, country }} />
            </div>
        </div>
    );
}
