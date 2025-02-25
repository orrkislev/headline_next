import LabeledIcon from "@/components/LabeledIcon";
import FontToggle from "./FontToggle";
import ViewToggle from "./ViewToggle";
import LanguageToggle from "./LanguageToggle";
import TranslateToggle from "./TranslateToggle";
import OrderToggle from "./OrderToggle";
import SourcesToggle from "./SourcesToggle";
import { DateSelector } from "./DateSelector";
import { useParams } from "next/navigation";
import PopUpCleaner from "@/components/PopUp";
import { useState } from "react";
import { PublicOutlined, InfoOutlined } from "@mui/icons-material";
import Link from "next/link";
import { TopBarButton } from "@/components/IconButtons";
import CustomTooltip from "@/components/CustomTooltip";

export default function Settings({ open, close }) {
    const { locale } = useParams()
    
    return (
        <>
            <PopUpCleaner open={open} close={close} />
            <div className={`absolute ${open ? 'block' : 'hidden'} p-4 flex items-center divide-x divide-gray-200 bg-white rounded shadow z-[1000] top-[2em] ${locale === 'heb' ? 'left-0' : 'right-0'}`}>
                <DateSelector />
                <div className="flex flex-row">
                    <LabeledIcon 
                        label="Home" 
                        icon={
                            <Link href="/global">
                                <CustomTooltip title="to the global view" placement="left" arrow>
                                    <TopBarButton>
                                        <PublicOutlined />
                                    </TopBarButton>
                                </CustomTooltip>
                            </Link>
                        } 
                    />
                    <LabeledIcon 
                        label="About" 
                        icon={
                            <Link href="/about">
                                <CustomTooltip title="About the Hear" placement="left" arrow>
                                    <TopBarButton>
                                        <InfoOutlined />
                                    </TopBarButton>
                                </CustomTooltip>
                            </Link>
                        } 
                    />
                </div>
                <div className="flex flex-row">
                    <LabeledIcon label="Font" icon={<FontToggle />} />
                    <LabeledIcon label="View" icon={<ViewToggle />} />
                </div>
                <div className="flex flex-row">
                    <LabeledIcon label="Language" icon={<LanguageToggle />} />
                    <LabeledIcon label="Translate" icon={<TranslateToggle />} />
                </div>
                <LabeledIcon label="Order" icon={<OrderToggle />} />
                <LabeledIcon label="Sources" icon={<SourcesToggle />} />
            </div>
        </>
    )
}