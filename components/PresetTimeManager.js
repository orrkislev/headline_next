import { useEffect, useRef } from "react";
import { create } from "zustand";

export const useDate = create((set) => ({
    date: new Date(),
    isPresent: false,
    setDate: (date) => set({ date }),
    setPresent: (isPresent) => set({ isPresent })
}));

export default function PresentTimeManager() {
    const { date, setDate, isPresent, setPresent } = useDate();
    const currentTime = useRef({});

    useEffect(()=>{
        const interval = setInterval(() => {
            const d = new Date();
            currentTime.current = {
                date: d.toDateString(),
                hours: d.getHours(),
                minutes: d.getMinutes()
            }
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // const now = new Date();
        // const isPresent = now.toDateString() === date.toDateString() && now.getHours() === date.getHours() && now.getMinutes() === date.getMinutes();
        const isPresent = currentTime.current.date === date.toDateString() &&
                          currentTime.current.hours === date.getHours() && 
                          currentTime.current.minutes === date.getMinutes();
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