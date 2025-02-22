'use client'

import getSourceOrder from "@/utils/sources/source orders";
import getSourceOrders from "@/utils/sources/source orders";
import { getTypographyOptions } from "@/utils/typography";
import { choose } from "@/utils/utils";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { create } from "zustand";

export const usePreferences = create((set, get) => ({
    theme: 'light',
    setTheme: (theme) => set({ theme }),
    activeWebsites: [],
    setActiveWebsites: (websites) => set({ activeWebsites: websites }),
    order: 'default',
    setOrder: (order) => set({ order }),
    font: 'random',
    setFont: (font) => set({ font }),
    view: 'grid',
    setView: (view) => set({ view }),
    locale: 'en',
    setLocale: (locale) => set({ locale }),
}))

export default function PreferencesManager({locale}) {
    const { country } = useParams()
    const setFont = usePreferences(state => state.setFont);
    const setLocale = usePreferences(state => state.setLocale);
    const setActiveWebsites = usePreferences(state => state.setActiveWebsites);

    useEffect(()=>{
        if (locale == 'heb') setLocale('heb')
        else setLocale('en')
    },[locale])

    useEffect(()=>{
        const fontOptions = getTypographyOptions(country)
        setFont(choose(fontOptions))

        const defaultOrder = getSourceOrder(country, 'default')
        const firstSixWebsites = defaultOrder.slice(0, 6)
        setActiveWebsites(firstSixWebsites)
    },[country])

    return null
}