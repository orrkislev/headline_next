'use client'

import CustomTooltip from "@/components/CustomTooltip";
import { List } from "@mui/icons-material";
import { useState } from "react";
import { useGlobalSort } from "@/utils/store";
export default function Settings({ locale }) {
    // const [open, setOpen] = useState(false)
    const { globalSort, setGlobalSort } = useGlobalSort()
    const [sourcesDialogOpen, setSourcesDialogOpen] = useState(false)

    const handleSortTypeChange = (newSortType) => {
        setGlobalSort(newSortType)
    }

    const handleLanguageChange = (newLocale) => {
        if (newLocale === locale) return
        if (!window) return
        window.location.href = window.location.pathname.replace(`/${locale}/`, `/${newLocale}/`);
    }

    const handleSourcesDialogOpen = (newSourcesDialogOpen) => {
        setSourcesDialogOpen(newSourcesDialogOpen)
    }

    const sortOptions = [
        { label: "AI", value: "ai", title: "An AI reads and sorts the headlines, acting as a live editor" },
        { label: "COHESION", value: "cohesion", title: "Sorts headlines by the degree the different sources agree on what the main story is" },
        { label: "POPULATION", value: "population", title: "Sorts countries by population size" },
        { label: "SOFT POWER", value: "softPower", title: "Sorts countries according to Brand Finance's 'Soft Power Index'" },
        { label: "PRESS FREEDOM", value: "pressFreedom", title: "Sorts countries according to the World Press Freedom Index by RSF" },
    ]

    const languageOptions = [
        { label: "Hebrew", value: "heb", title: "Shows headlines in Hebrew" },
        { label: "English", value: "en", title: "Shows headlines in English" },
    ]

    return (
        <div>
            {/* <CustomTooltip title="Settings" arrow>
                <TopBarButton size="small" onClick={() => setOpen(prev => !prev)}>
                    <SettingsRounded sx={{ color: open ? "blue" : "inherit" }} />
                </TopBarButton>
            </CustomTooltip> */}

            {/* <Collapse in={open} orientation="horizontal"> */}
            <div className="flex items-center">
                <div className="mx-2 h-full border-l border-gray-300" />

                <span className="text-xs whitespace-nowrap text-[#707070] mr-2 hover:text-blue-500">
                    SORT BY
                </span>

                <div className="h-6 flex">
                    <div className="inline-flex h-full rounded-md border border-gray-300 divide-x">
                        {sortOptions.map(sortOption => (
                            <CustomTooltip key={sortOption.value} title={sortOption.title} placement="bottom" arrow>
                                <button
                                    onClick={() => handleSortTypeChange(sortOption.value)}
                                    className={`px-1.5 py-0.5 text-xs ${globalSort === sortOption.value ? "bg-gray-300" : "hover:bg-gray-100"}`}
                                >
                                    {sortOption.label}
                                </button>
                            </CustomTooltip>
                        ))}
                    </div>
                </div>

                <div className="mx-2 h-full border-l border-gray-300" />

                <div className="h-6">
                    <div className="inline-flex h-full rounded-md border border-gray-300 divide-x">
                        {languageOptions.map(languageOption => (
                            <CustomTooltip key={languageOption.value} title={languageOption.title} placement="bottom" arrow>
                                <button
                                    onClick={() => handleLanguageChange(languageOption.value)}
                                    className={`px-1.5 py-0.5 text-xs ${locale === languageOption.value ? "bg-gray-300" : "hover:bg-gray-100"}`}
                                >
                                    {languageOption.label}
                                </button>
                            </CustomTooltip>
                        ))}
                    </div>
                </div>

                <div className="mx-2 h-full border-l border-gray-300" />

                <button
                    onClick={() => setSourcesDialogOpen(true)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                >
                    <List className="text-base" />
                </button>
            </div>
            {/* </Collapse> */}
        </div>
    )
}