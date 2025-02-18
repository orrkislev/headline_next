import { useEffect } from "react";
import { create } from "zustand";

export const useDate = create((set) => ({
    date: new Date(),
    isPresent: false,
    setDate: (date) => set({ date }),
    setPresent: (isPresent) => set({ isPresent })
}));

export default function PresentTimeManager() {
    const { date, setDate, isPresent, setPresent } = useDate();

    useEffect(() => {
        // check if date is present (if its the same day and same hours and minutes)
        const now = new Date();
        const isPresent = now.toDateString() === date.toDateString() && now.getHours() === date.getHours() && now.getMinutes() === date.getMinutes();
        setPresent(isPresent);
    }, [date]);

    useEffect(() => {
        if (isPresent) {
            const interval = setInterval(() => {
                setDate(new Date());
            }, 60000)
            return () => clearInterval(interval);
        }
    }, [isPresent]);

    return null;
}