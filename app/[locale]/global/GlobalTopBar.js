'use client';

import Clock from "@/components/Clock";
import { useState } from 'react';
import { useGlobalSort } from "@/utils/store";
import CustomTooltip from "@/components/CustomTooltip";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';

export default function GlobalTopBar({ locale }) {
    const [loadingSort, setLoadingSort] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [expandAll, setExpandAll] = useState(false);
    const { globalSort, setGlobalSort, setAllExpanded } = useGlobalSort();

    const sortOptions = [
        { label: "AI", value: "ai", title: "An AI reads and sorts the headlines, acting as a live editor" },
        { label: "Cohesion", value: "cohesion", title: "Sorts headlines by the degree the different sources agree on what the main story is" },
        { label: "Recency", value: "recency", title: "Sorts countries by most recent headline activity" },
        { label: "Population", value: "population", title: "Sorts countries by population size" },
        { label: "Soft Power", value: "softPower", title: "Sorts countries according to Brand Finance's 'Soft Power Index'" },
        { label: "Press Freedom", value: "pressFreedom", title: "Sorts countries according to the World Press Freedom Index by RSF" },
    ];

    const handleSortChange = (sortType) => {
        setLoadingSort(sortType);
        setDropdownOpen(false);
        // Simulate loading time
        setTimeout(() => {
            setGlobalSort(sortType);
            setLoadingSort(null);
        }, 300);
    };

    const toggleExpandAll = () => {
        const newExpandState = !expandAll;
        setExpandAll(newExpandState);
        setAllExpanded(newExpandState);
    };

    return (
        <nav className="w-full bg-white z-50 border-b border-gray-200 py-1 direction-ltr">
            <div className="w-full mx-auto px-5">
                <div className="flex items-center h-10 relative">
                    {/* Site Title with Geist font */}
                    <div className="flex-1">
                        <h1 className="text-sm font-medium cursor-default hover:text-blue transition-colors font-['Geist']">The Hear</h1>
                    </div>

                    {/* Center: Clock - absolutely positioned for perfect centering */}
                    <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${locale === 'heb' ? 'ml-[10px]' : 'ml-[-10px]'}`}>
                        <Clock locale={locale} />
                    </div>

                    {/* Sorting Options Dropdown */}
                    <div className="flex-1 flex items-center justify-end">
                        <div className="relative">
                            <button 
                                className={`px-2 py-1 text-xs ${globalSort ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-50 hover:bg-gray-200'} rounded-md transition-colors font-['Geist'] flex items-center gap-1`}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                onBlur={() => setTimeout(() => setDropdownOpen(false), 100)}
                            >
                                <span className="mr-1">Sort by </span>
                                <span className="font-medium">
                                    {sortOptions.find(option => option.value === globalSort)?.label || "SORT"}
                                </span>
                                {loadingSort && (
                                    <div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                                )}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-1 w-48 bg-white rounded-sm shadow-lg z-50">
                                    <div className="p-2">
                                        <div className="flex flex-col divide-y divide-gray-100">
                                            {sortOptions.map((sortOption) => (
                                                <div
                                                    key={sortOption.value}
                                                    onClick={() => handleSortChange(sortOption.value)}
                                                    className={`flex flex-col py-2 px-3 hover:bg-gray-50 cursor-pointer ${globalSort === sortOption.value ? 'bg-gray-100' : ''}`}
                                                >
                                                    <div className="flex items-center justify-between w-full">
                                                        <span className="text-xs font-['Geist']">{sortOption.label}</span>
                                                        {globalSort === sortOption.value && (
                                                            <span className="h-2 w-2 rounded-full bg-blue"></span>
                                                        )}
                                                    </div>
                                                    <span className="text-[10px] text-gray-500 mt-1">{sortOption.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <CustomTooltip title={expandAll ? "Collapse all overviews" : "Expand all overviews"}>
                            <button 
                                onClick={toggleExpandAll}
                                className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
                            >
                                {expandAll ? 
                                    <UnfoldLessIcon style={{ fontSize: '1.1rem' }} /> : 
                                    <UnfoldMoreIcon style={{ fontSize: '1.1rem' }} />
                                }
                            </button>
                        </CustomTooltip>
                    </div>
                </div>
            </div>
        </nav>
    );
}