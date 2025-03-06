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

export const useActiveWebsites = create(set => ({
    activeWebsites: [],
    setActiveWebsites: (activeWebsites) => set({ activeWebsites }),
}));