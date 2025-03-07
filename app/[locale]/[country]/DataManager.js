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
        if (date) setDay(date.toDateString())
    }, [date])

    const queryDay = searchParams.get('day')

    useEffect(() => {
        if (!day) return
        const date = new Date(day + ' UTC');
        const dayStr = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('day') === dayStr) return
        urlParams.set('day', dayStr);
        const url = `/${locale}/${country}?${urlParams.toString()}`
        router.push(url)
        // window.history.replaceState({}, '', '?' + urlParams.toString())
        // router.push({ search: '?' + urlParams.toString() }, undefined, { shallow: true })
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