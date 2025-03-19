'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import FlagIcon from "@/components/FlagIcon";

// Move sources to this file for cleaner organization
export const sources = [
  {
    websiteId: 'NYTimes',
    countryId: 'US',
    label: 'The New York Times',
    domain: 'nytimes.com'
  },
  {
    websiteId: 'Spiegel',
    countryId: 'Germany',
    label: 'Der Spiegel',
    domain: 'spiegel.de'
  },
  {
    websiteId: 'bbc',
    countryId: 'UK',
    label: 'BBC News',
    domain: 'bbc.com'
  },
  {
    websiteId: 'Ynet',
    countryId: 'Israel',
    label: 'ווינט',
    domain: 'ynet.co.il'
  },
  {
    websiteId: 'lemonde',
    countryId: 'France',
    label: 'Le Monde',
    domain: 'lemonde.fr'
  },
  {
    websiteId: 'elpais',
    countryId: 'Spain',
    label: 'El País',
    domain: 'elpais.com'
  }
];

export function RandomSampleCards({ typographyStyle }) {
  const [randomSources, setRandomSources] = useState(
    sources.sort(() => Math.random() - 0.5).slice(0, 3)
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start the fade-out animation
      setIsVisible(false);

      // After the fade-out transition (500ms), swap in new content and fade back in
      setTimeout(() => {
        const newSources = sources.sort(() => Math.random() - 0.5).slice(0, 3);
        setRandomSources(newSources);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {randomSources.map((sourceConfig, index) => (
        <div className="md:col-span-4" key={`sample-${index}`}>
          <div 
            className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="h-full bg-white rounded-lg shadow-sm p-4 flex flex-col justify-between">
              <div>
                <h3 
                  className="text-lg font-medium text-blue-600 mb-2"
                  style={{
                    fontFamily: 'var(--font-cheltenham)',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    color: 'blue'
                  }}
                >
                  {sourceConfig.label}
                </h3>
                <p 
                  className="text-xl mb-4"
                  style={{
                    fontFamily: 'var(--font-cheltenham)',
                    fontSize: '2rem',
                    // fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  Sample headline for {sourceConfig.label}
                </p>
              </div>
              
              <div className="flex items-center text-xs text-gray-500 mt-auto">
                <div className="mr-1">
                  <FlagIcon country={sourceConfig.countryId} />
                </div>
                <span className="border-r border-gray-300 h-4 mx-2"></span>
                <div className="flex items-center">
                  <Image 
                    src={`https://www.google.com/s2/favicons?sz=64&domain=${sourceConfig.domain}`}
                    alt={`${sourceConfig.label} favicon`}
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  <span>{sourceConfig.websiteId}</span>
                </div>
                <span className="border-r border-gray-300 h-4 mx-2"></span>
                <span>{new Date().toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                })}</span>
              </div>
              
              <p 
                className="text-sm text-gray-600 mt-4 font-normal"
                style={{
                  fontFamily: 'Geist, sans-serif',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  fontWeight: 400
                }}
              >
                This is a sample subtitle that would typically appear under the main headline.
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}