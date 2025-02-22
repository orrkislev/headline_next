import React, { useEffect, useMemo, useRef, useState } from 'react';
import logoA from './logo/logo-head.png';
import logoB from './logo/logo-head-2.png';
import logoC from './logo/logo-head-4.png';
import Link from 'next/link';
import Image from 'next/image';
import { usePreferences } from './PreferencesManager';
import { useDate } from './TimeManager';
import { useData } from './DataManager';

export default function DynamicLogo() {
    const locale = usePreferences(state => state.locale);
    const [currentLogo, setCurrentLogo] = useState(logoA);
    const [isFakeHover, setIsFakeHover] = useState(true);

    const eyeTimeout = useRef(null);
    const openEyes = () => {
        if (eyeTimeout.current) clearTimeout(eyeTimeout.current);
        setCurrentLogo(logoB);
        eyeTimeout.current = setTimeout(() => {
            setCurrentLogo(logoC);
            setTimeout(()=>{
                setCurrentLogo(logoA);
            }, 400);
        }, 600);
    }

    // Add fake hover effect every 50 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsFakeHover(true);
            const timeoutId = setTimeout(() => {
                setIsFakeHover(false);
            }, 5000); // Reset after 5 seconds
            return () => clearTimeout(timeoutId);
        }, 50000); // Trigger every 50 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Link href="/" className='hidden md:block'>
            <LogoTimeManager openEyes={openEyes} />
            <div className='logo-hover-container flex items-center justify-center relative border-b border-gray-200 p-4'>
                <div className='logo-background absolute top-[35%] left-0 w-full h-[22%] bg-gray-200 opacity-0 transform translate-y-[-50%]'
                    style={{
                        transition: 'opacity 0.2s ease',
                        transitionDelay: '.8s',
                    }}
                />

                <div className="logo-text-left absolute left-[10%] top-[35%] font-serif text-2xl text-black z-10 opacity-0 transition-opacity duration-100 pointer-events-none transform translate-y-[-50%]"
                    style={{
                        fontFamily: '"cheltenham", serif',
                        fontSize: '2rem',
                    }}>
                    THE
                </div>

                <Image className={`relative z-20 h-[160px] ${locale === 'heb' ? 'scale-x-[-1]' : ''} object-contain pb-1`}
                    src={currentLogo} alt="The Hear Logo" />

                <div className="logo-text-right absolute right-[10%] top-[35%] font-serif text-2xl text-black z-10 opacity-0 transition-opacity duration-100 delay-500 pointer-events-none transform translate-y-[-50%]"
                    style={{
                        fontFamily: '"cheltenham", serif',
                        fontSize: '2rem',
                        transition: 'opacity 0.1s ease',
                        transitionDelay: '0.5s',
                    }}>
                    HEAR
                </div>

            </div>
            <style>{`
                .logo-hover-container:hover .logo-text-left,
                .summary-section:hover .logo-text-left,
                .fake-hover .logo-text-left {
                    opacity: 1 !important;
                }
                .logo-hover-container:hover .logo-text-right,
                .summary-section:hover .logo-text-right,
                .fake-hover .logo-text-right {
                    opacity: 1 !important;
                }
                .logo-hover-container:hover .logo-background,
                .summary-section:hover .logo-background,
                .fake-hover .logo-background {
                    opacity: 1 !important;
                }
            `}</style>
        </Link>
    );
};

function LogoTimeManager({ openEyes }) {
    const minutes = useDate(state => state.date.getHours() * 60 + state.date.getMinutes());
    const day = useDate(state => state.date.toDateString());
    const sources = useData(state => state.sources);
    const [headlines, setHeadlines] = useState([]);
    const currentHeadline = useRef(null)

    useEffect(() => {
        const allHeadlines = Object.values(sources).flat();
        const todayHeadlines = allHeadlines.filter(headline => headline.timestamp.toDateString() === day);
        const todayHeadlinesMinutes = todayHeadlines.map(headline => headline.timestamp.getHours() * 60 + headline.timestamp.getMinutes());
        todayHeadlinesMinutes.sort((a, b) => b - a);
        setHeadlines(todayHeadlinesMinutes);
    }, [day, sources]);

    useEffect(() => {
        const newHeadline = headlines.find(headline => headline < minutes);
        if (newHeadline && newHeadline !== currentHeadline.current) {
            currentHeadline.current = newHeadline;
            openEyes();
        }
    }, [headlines, minutes]);

    return null;
}