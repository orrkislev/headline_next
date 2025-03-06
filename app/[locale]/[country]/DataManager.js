'use client'

import { useActiveWebsites } from "@/utils/store";
import { useEffect } from "react";

export default function DataManager({ initialActiveWebsites }) {
    const setActiveWebsites = useActiveWebsites((state) => state.setActiveWebsites);
    useEffect(() => {
        setActiveWebsites(initialActiveWebsites)
    }, [initialActiveWebsites])
    return null
}