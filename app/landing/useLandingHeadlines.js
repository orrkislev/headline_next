'use client';

import { useState, useEffect } from 'react';

const useLandingHeadlines = (sourceConfig) => {
  const [source, setSource] = useState({ headlines: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        setIsLoading(true);
        // Mock data for sample headlines
        const mockHeadline = {
          headline: `Sample headline for ${sourceConfig.label}`,
          subtitle: `This is a sample subtitle for ${sourceConfig.label} that would typically appear under the main headline.`,
          timestamp: new Date().toISOString(),
          website_id: sourceConfig.websiteId,
          country_id: sourceConfig.countryId
        };
        
        // Simulate API delay
        setTimeout(() => {
          setSource({
            headlines: [mockHeadline]
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching headlines:", error);
        setIsLoading(false);
      }
    };

    fetchHeadlines();
  }, [sourceConfig]);

  return { source, isLoading };
};

export default useLandingHeadlines;