'use client'

import { useTime } from "@/utils/store"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function DataManager({ locale, country }) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const date = useTime(state => state.date)
    const setDate = useTime(state => state.setDate)
    const [day, setDay] = useState(date.toDateString())

    useEffect(() => {
        console.log('new date', date)
        if (date) setDay(date.toDateString())
    }, [date])

    const queryDay = searchParams.get('day')

    useEffect(() => {
        if (!day) return
        console.log('new day', day)
        const date = new Date(day + ' UTC');
        const dayStr = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('day') === dayStr) return
        urlParams.set('day', dayStr);
        // const url = `/${locale}/${country}?${urlParams.toString()}`
        // router.push(url)
        const url = `/${locale}/${country}?day=${dayStr}`
        window.history.replaceState(null, '', url);
    }, [day])

    useEffect(() => {
        if (!queryDay) return
        if (!day) return
        const queryDate = new Date(queryDay + ' T00:00:00');
        const dayDate = new Date(day + ' T00:00:00');
        if (queryDate.toDateString() !== dayDate.toDateString()) {
            setDay(queryDay)
        }
    }, [queryDay, day])

    return null
}