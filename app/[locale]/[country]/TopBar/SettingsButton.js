'use client'

import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { SettingsRounded } from "@mui/icons-material";
// import Settings from "./settings/Settings";
import { useState } from "react";

export function SettingsButton() {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex items-center">
            <CustomTooltip title="Settings" arrow>
                <TopBarButton 
                    size="small" 
                    onClick={() => setOpen(prev => !prev)}
                >
                    <SettingsRounded />
                </TopBarButton>
            </CustomTooltip>
            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    open ? 'w-auto opacity-100 ml-4' : 'w-0 opacity-0 ml-0'
                }`}
            >
                {/* <Settings inline={true} /> */}
            </div>
        </div>
    );
}
