import { isSameMinute } from "date-fns";
import { useEffect } from "react";
import { create } from "zustand";

export const useDate = create((set, get) => ({
    date: new Date(),
    isPresent: false,
    setDate: (date) => set({ date }),
    setPresent: (isPresent) => set({ isPresent }),
    setDay: (day) => {
        const currentDate = get().date;
        day.setHours(currentDate.getHours(), currentDate.getMinutes());
        set({ date: day });
    },
}));

export default function TimeManager() {
    const { date, setDate, isPresent, setPresent } = useDate();

    useEffect(() => {
        setPresent(isSameMinute(date, new Date()));
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