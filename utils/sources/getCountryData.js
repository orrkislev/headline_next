// Import registry - will store loaded country data
const loadedCountries = {};

// Create a proxy object with getters for each country
export const sources = {
    countries: new Proxy({}, {
        get: (target, countryName) => {
            if (typeof countryName !== 'string') return undefined;

            // Return cached data if already loaded
            if (loadedCountries[countryName]) {
                return loadedCountries[countryName];
            }

            try {
                // Synchronous import (works with bundlers like webpack)
                // This will be included in your bundle but code-split
                const countryData = require(`./countries/${countryName}.js`).default;

                // Cache for future access
                loadedCountries[countryName] = countryData;
                return countryData;
            } catch (error) {
                console.error(`Failed to load data for country: ${countryName}`);
                return null;
            }
        }
    })
};

export const normalizeSourceName = (name) => {
  return name.toLowerCase().replace(/\./g, '_').replace(/ /g, '_');
};
export function getSourceData(country, source) {
    return sources.countries[country].sources[normalizeSourceName(source)];
}

export function getSourceOrder(country, order) {
    return sources.countries[country].orders[order];
}
export const orderOptionLabels = {
    'largest': 'Largest',
    'mostReputable': 'Most Reputable',
    'progressiveToConservative': 'Progressive to Conservative',
    'conservativeToProgressive': 'Conservative to Progressive',
    'default': 'Default'
}