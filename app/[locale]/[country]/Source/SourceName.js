'use client'

import { useState, useRef } from "react"

export default function SourceName({ name, description, typography, date }) {
    const isPresent = date ? new Date() - date < 60 * 1000 * 5 : true

    const [tooltipVisible, setTooltipVisible] = useState(false)
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
    const timerRef = useRef(null)

    const handleMouseEnter = () => {
        timerRef.current = setTimeout(() => {
            setTooltipVisible(true)
        }, 500)
    }

    const handleMouseMove = (e) => {
        setTooltipPosition({ x: e.pageX, y: e.pageY })
    }

    const handleMouseLeave = () => {
        clearTimeout(timerRef.current)
        setTooltipVisible(false)
    }

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <span className={`text-sm cursor-help ${isPresent ? 'text-blue' : 'text-black'}`} style={{ 
                ...typography, 
                fontSize: typography.fontFamily === 'var(--font-frank-re-tzar)' ? '2.1rem' : '1.5rem' 
            }}>
                {name}
            </span>
            {tooltipVisible && (
                <div className="fixed bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-[400px] z-[1000] direction-ltr"
                style={{
                    top: tooltipPosition.y + 10,
                    left: tooltipPosition.x + 10,
                }}>
                    {description}
                </div>
            )}
        </div>
    )
}