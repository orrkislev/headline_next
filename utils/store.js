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
    setTranslate: (sourceName) => set(state => {
        if (state.translate.includes(sourceName)) {
            return { translate: state.translate.filter(name => name !== sourceName) }
        }
        return { translate: [...state.translate, sourceName] }
    }),
    clearTranslations: () => set({ translate: [] }),
}));

export const useActiveWebsites = create(set => ({
    activeWebsites: [],
    setActiveWebsites: (websites) => set({ activeWebsites: websites }),
}));