"use client";
import { getSourceOrder } from "./sources/getCountryData";
import { useActiveWebsites, useOrder } from "./store";
import { useEffect } from "react";

export default function useWebsites(country, sources) {
    const { order, setOrder } = useOrder()
    const { activeWebsites, setActiveWebsites } = useActiveWebsites();

    useEffect(() => {
        if (!sources) return;
        const sourceOrder = getSourceOrder(country, order);
        const filteredSources = sourceOrder.filter(source => Object.keys(sources).map(normalizeSourceName).includes(source));
        const namedSources = filteredSources.map(source => Object.keys(sources).find(key => normalizeSourceName(key) === source));
        setActiveWebsites(namedSources.slice(0, 6));
    }, [sources, country])


    const addNextWebsite = () => {
        const sourceOrder = getSourceOrder(country, order);
        const availableSources = sources ? sourceOrder.filter(source => sources[source]) : sourceOrder;

        const nextSource = availableSources.find((source) => !activeWebsites.includes(source));
        const newSources = [...activeWebsites, nextSource]
            .sort((a, b) => sourceOrder.indexOf(a) - sourceOrder.indexOf(b));
        setActiveWebsites(newSources);
    };

    const toggleSource = (source) => {
        const newWebsites = activeWebsites.includes(source)
            ? activeWebsites.filter(website => website !== source)
            : [...activeWebsites, source];
        const sourceOrder = getSourceOrder(country, order);
        const orderedWebsites = sourceOrder.filter(source => newWebsites.includes(source));
        setActiveWebsites(orderedWebsites);
    };

    const isActive = (source) => activeWebsites.find(website => website.toLowerCase() === source.toLowerCase());
    const getIndex = (source) => activeWebsites.findIndex(website => website.toLowerCase() === source.toLowerCase());

    return { websites: activeWebsites, addNextWebsite, toggleSource, isActive, getIndex }
}


export const normalizeSourceName = (name) => {
    if (!name) return '';
    const normalized = name.toLowerCase()
                         .replace(/\./g, '_')
                         .replace(/ /g, '_');
    return normalizationMapping[name] || normalized;
  };
const normalizationMapping = {
    "Israel Hayom": "israel_hayom",
    "Jerusalem Post": "jerusalem_post",
    "Makor Rishon": "makor_rishon",
    "Times of Israel": "times_of_israel",
    "N12": "n12",
    "13tv": "13tv",
    "Al Ittihad": "aletihad",
    "Al Bayan": "albayan",
    "Emarat Al Youm": "emaratalyoum",
    "Al Ittihad (English)": "en_aletihad",
    "Emirates 24/7": "emirates247",
    "Gulf Today": "gulftoday",
    "Al Roeya": "alroeya",
    "Al Ain": "alain",
    "Al Wahda": "alwahdanews",
    "united arab emirates": "uae",
    "united-arab-emirates": "uae"
  }