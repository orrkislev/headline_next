'use client'

import { InfoOutlined, PublicOutlined, SettingsOutlined } from "@mui/icons-material";
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
        <div className="relative">
            <CustomTooltip title="Settings" arrow>
                <TopBarButton size="small" onClick={() => setOpen(prev => !prev)}>
                    <SettingsOutlined />
                </TopBarButton>
            </CustomTooltip>
            <Settings open={open} close={() => setOpen(false)} />
        </div>
    );
}


