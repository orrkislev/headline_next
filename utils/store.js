import { create } from "zustand";

export const useTime = create(set => ({
    date: new Date(),
    setDate: (date) => set({ date }),
}));

export const useFont = create(set => ({
    font: 'default',
    setFont: (font) => set({ font }),
}));

// export const useView = create(set => ({
//     view: 'grid',
//     setView: (view) => set({ view }),
// }));

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