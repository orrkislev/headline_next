import { sourceMapping } from "./source mapping";

export const normalizeSourceName = (name) => {
    if (!name) return '';
    const normalized = name.toLowerCase()
        .replace(/\./g, '_')
        .replace(/ /g, '_');
    // return normalizationMapping[name] || normalized;
    return normalized;
};


export const getSourceName = (country, sourceId) => {
    const name = sourceMapping[country.toLowerCase()]?.[normalizeSourceName(sourceId)] || sourceId;
    return name;
}
