import Link from "next/link";
import InnerLink from "@/components/InnerLink";
import FlagIcon from "@/components/FlagIcon";
import { Info } from "lucide-react";
import { countries } from "@/utils/sources/countries";

export default function FeedFooter({ locale, country, daySummary, date }) {
    // Use locale directly for SSR compatibility
    const effectiveLocale = locale;

    // Get country name - always use English for footer to avoid RTL issues
    const countryData = countries[country] || {};
    const countryName = countryData.english || country;

    // Create URL for time machine view (remove /feed from current path)
    const formatDateForUrl = (dateObj) => {
        return `${dateObj.getDate().toString().padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${dateObj.getFullYear()}`;
    };
    const timeMachineUrl = `/${locale}/${country}/${formatDateForUrl(date)}`;

    // Create URL for live headlines (country-only URL)
    const liveHeadlinesUrl = `/${locale}/${country}`;

    // Create URL for date archives (global history for this date)
    const dateArchivesUrl = `/${locale}/global/history/${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

    // Create URL for monthly archives (country-specific month view)
    const monthlyArchivesUrl = `/${locale}/${country}/history/${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;

    return (
        <div className="sticky bottom-0 z-40 flex border-t border-gray-200 px-2 py-3 bg-white direction-ltr">
            <div className="flex items-center justify-center min-w-0 flex-1">
                {/* Time machine view link */}
                <InnerLink
                    href={timeMachineUrl}
                    locale={locale}
                >
                    <div className="text-xs bg-gradient-to-r from-green-100 to-green-200 px-4 py-1 rounded-xl cursor-pointer font-['Geist'] hover:shadow-lg hover:text-gray-800 whitespace-nowrap">
                        Time Machine View
                    </div>
                </InnerLink>
                <div className="border-l border-gray-300 h-[50%] mx-2 sm:mx-5 flex-shrink-0"></div>

                {/* Date archives link */}
                <InnerLink
                    href={dateArchivesUrl}
                    locale={locale}
                >
                    <div className="text-xs cursor-pointer bg-gray-100 px-4 py-1 rounded-xl font-['Geist'] hover:text-blue hover:bg-gray-50 hover:border-gray-300 whitespace-nowrap">
                        <span className="font-mono">{date.getDate().toString().padStart(2, '0')}.{String(date.getMonth() + 1).padStart(2, '0')}.{date.getFullYear()}</span> &nbsp;&nbsp;archives
                    </div>
                </InnerLink>
                <div className="border-l border-gray-300 h-[50%] mx-2 sm:mx-5 flex-shrink-0"></div>

                {/* Monthly archives link */}
                <InnerLink
                    href={monthlyArchivesUrl}
                    locale={locale}
                >
                    <div className="text-xs cursor-pointer bg-gray-100 px-4 py-1 rounded-xl font-['Geist'] hover:text-blue hover:bg-gray-50 hover:border-gray-300 whitespace-nowrap">
                        {new Date(date.getFullYear(), date.getMonth()).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} news archives from {(country === 'us' || country === 'uk') ? 'the ' : ''}{countryName}
                    </div>
                </InnerLink>

                {/* Live headlines link */}
                <div className="border-l border-gray-300 h-[50%] mx-2 sm:mx-5 flex-shrink-0"></div>
                <InnerLink
                    href={liveHeadlinesUrl}
                    locale={locale}
                >
                    <div className="flex items-center gap-2 text-xs bg-gray-100 px-4 py-1 rounded-xl cursor-pointer font-['Geist'] hover:text-blue hover:bg-gray-50 hover:border-gray-300 whitespace-nowrap">
                        <FlagIcon country={country} />
                        <span>Live headlines from {(country === 'us' || country === 'uk') ? 'the ' : ''}{countryName}</span>
                    </div>
                </InnerLink>

                {/* About page link */}
                <div className="border-l border-gray-300 h-[50%] mx-2 sm:mx-5 flex-shrink-0"></div>
                <InnerLink
                    href="/about"
                    locale={locale}
                >
                    <div className="flex items-center justify-center text-xs bg-gray-100 px-3 py-1 rounded-xl cursor-pointer font-['Geist'] hover:text-blue hover:bg-gray-50 hover:border-gray-300">
                        <Info size={10} />
                    </div>
                </InnerLink>
            </div>
        </div>
    );
}
