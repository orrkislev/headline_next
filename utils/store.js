import { create } from "zustand";

export const useTime = create(set => ({
    date: new Date(),
    setDate: (date) => set({ date }),
}));

export const useFont = create(set => ({
    font: Math.round(Math.random() * 5),
    setFont: (font) => set({ font }),
}));

export const useOrder = create(set => ({
    order: 'default',
    setOrder: (order) => set({ order }),
}));

export const useTranslate = create(set => ({
    translate: [],
    setTranslate: (sourceNames) => set({ translate: sourceNames }),
    toggleTranslate: (sourceName) => set(state => {
        if (state.translate.includes(sourceName)) {
            return { translate: state.translate.filter(name => name !== sourceName) }
        }
        return { translate: [...state.translate, sourceName] }
    }),
    clearTranslations: () => set({ translate: [] }),

    useLocalLanguage: false,
    toggleLocalLanguage: () => set(state => ({ useLocalLanguage: !state.useLocalLanguage })),
}));

export const useActiveWebsites = create(set => ({
    activeWebsites: [],
    setActiveWebsites: (websites) => set({ activeWebsites: websites }),
}));


export const useGlobalSort = create(set => ({
    globalSort: 'ai',
    setGlobalSort: (sort) => set({ globalSort: sort }),
    pinnedCountries: [],
    setPinnedCountries: (countries) => set({ pinnedCountries: countries }),
    allExpanded: false,
    setAllExpanded: (expanded) => set({ allExpanded: expanded }),
}));
export const useGlobalCountryCohesion = create(set => ({
    globalCountryCohesion: {},
    setGlobalCountryCohesion: (country, cohesion) => set(state => ({ globalCountryCohesion: { ...state.globalCountryCohesion, [country]: cohesion } })),
}));