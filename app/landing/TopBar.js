'use client';

import Link from 'next/link';
import { countries } from "@/utils/sources/countries";
import FlagIcon from "@/components/FlagIcon";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TopBar() {
  const [loadingRegion, setLoadingRegion] = useState(null);
  const router = useRouter();

  const regions = {
    Europe: ['finland', 'france', 'germany', 'italy', 'netherlands', 'poland', 'russia', 'spain', 'turkey', 'uk', 'ukraine'],
    'Middle East': ['iran', 'israel', 'lebanon', 'palestine', 'uae'],
    Asia: ['china', 'india', 'japan']
  };

  const handleLinkClick = (href, region) => {
    setLoadingRegion(region);
    router.push(href).then(() => setLoadingRegion(null));
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="w-full md:w-[70%] md:min-w-[800px] md:max-w-[1200px] mx-auto px-5">
        <div className="flex items-center justify-between py-4">
          {/* Site Title with Geist font */}
          <h1 className="text-sm font-medium cursor-default hover:text-blue transition-colors font-['Geist']">The Hear</h1>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            {/* Mobile: Only show Global button */}
            <div className="md:hidden">
              <div 
                onClick={() => handleLinkClick('/en/global', 'Global')}
                className="px-4 py-2 text-sm bg-sky-100 rounded-md hover:bg-sky-200 transition-colors font-['Geist'] cursor-pointer flex items-center gap-2"
              >
                Global
                {loadingRegion === 'Global' && (
                  <div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
            </div>

            {/* Desktop: Show all buttons */}
            <div className="hidden md:flex items-center gap-4">
              {/* US Link */}
              <div 
                onClick={() => handleLinkClick('/en/us', 'US')}
                className="px-4 py-2 text-sm bg-gray-50 rounded-md hover:bg-gray-200 transition-colors font-['Geist'] cursor-pointer flex items-center gap-2"
              >
                US
                {loadingRegion === 'US' && (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>

              {/* Region Dropdowns */}
              {Object.entries(regions).map(([region, countryCodes]) => (
                <div key={region} className="group relative">
                  <button className="px-4 py-2 text-sm bg-gray-50 rounded-md hover:bg-gray-200 transition-colors font-['Geist'] flex items-center gap-1">
                    {region}
                    {loadingRegion === region && (
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    )}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {/* Add padding-top to create a hoverable gap */}
                  <div className="absolute right-0 pt-2">
                    <div className="mt-2 w-64 bg-white rounded-sm shadow-lg hidden group-hover:block">
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-[1px] bg-gray-200">
                          {countryCodes.map((id) => (
                            <div
                              key={id}
                              onClick={() => handleLinkClick(`/en/${id}`, region)}
                              className="flex items-center gap-2 p-2 hover:bg-gray-100 bg-white font-['Geist'] cursor-pointer"
                            >
                              <FlagIcon country={countries[id].id} />
                              <span className="text-xs">{countries[id].english}</span>
                            </div>
                          ))}
                          {/* Add empty white cell if odd number of countries */}
                          {countryCodes.length % 2 !== 0 && (
                            <div className="bg-white"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Global Link */}
              <div 
                onClick={() => handleLinkClick('/en/global', 'Global')}
                className="px-4 py-2 text-sm bg-sky-100 rounded-md hover:bg-sky-200 transition-colors font-['Geist'] cursor-pointer flex items-center gap-2"
              >
                Global
                {loadingRegion === 'Global' && (
                  <div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}