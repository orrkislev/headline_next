'use client'

import { InfoOutlined, PublicOutlined, SettingsRounded } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import Settings from "./settings/Settings";
import { TopBarButton } from "@/components/IconButtons";
import AboutMenu from "./AboutMenu";
import CustomTooltip from "@/components/CustomTooltip";

export function Global() {
    return (
        <CustomTooltip title="to the global view" arrow placement="bottom">
            <Link href="/global">
                <TopBarButton size="small">
                    <PublicOutlined />
                </TopBarButton>
            </Link>
        </CustomTooltip>
    );
}

export function Info() {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative">
            <CustomTooltip title="about the Hear" arrow>
                <TopBarButton size="small" onClick={() => setOpen(prev => !prev)}>
                    <InfoOutlined />
                </TopBarButton>
            </CustomTooltip>
            <AboutMenu open={open} close={() => setOpen(false)} />
        </div>
    );
}

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
                <Settings inline={true} />
            </div>
        </div>
    );
}


