'use client'

import { Archive } from "lucide-react";
import { useState } from "react";
import { TopBarButton } from "@/components/IconButtons";
import CustomTooltip from "@/components/CustomTooltip";
import ArchiveMenu from "./ArchiveMenu";

export default function ArchiveToggle({ locale, country }) {
    const [historyMenuOpen, setHistoryMenuOpen] = useState(false);

    return (
        <>
            <CustomTooltip title="To the archives" arrow>
                <TopBarButton size="small" onClick={() => setHistoryMenuOpen(true)}>
                    <Archive size={18} />
                </TopBarButton>
            </CustomTooltip>
            <ArchiveMenu 
                open={historyMenuOpen} 
                close={() => setHistoryMenuOpen(false)} 
                locale={locale} 
                country={country} 
            />
        </>
    );
}
