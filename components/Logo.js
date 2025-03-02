'use client'

import { useEffect, useRef, useState } from 'react';
import logoA from './logo/logo-head.png';
import logoB from './logo/logo-head-2.png';
import logoC from './logo/logo-head-4.png';
import Link from 'next/link';
import Image from 'next/image';

export default function DynamicLogo({ locale }) {
    const [currentLogo, setCurrentLogo] = useState(logoA);
    const [isFakeHover, setIsFakeHover] = useState(false);

    const eyeTimeout = useRef(null);
    const openEyes = () => {
        if (eyeTimeout.current) clearTimeout(eyeTimeout.current);
        setCurrentLogo(logoB);
        eyeTimeout.current = setTimeout(() => {
            setCurrentLogo(logoC);
            setTimeout(() => {
                setCurrentLogo(logoA);
            }, 400);
        }, 600);
    }

    // Add fake hover effect every 30 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsFakeHover(true);

            const timeoutId = setTimeout(() => {
                setIsFakeHover(false);
            }, 5000); // Reset after 5 seconds

            return () => clearTimeout(timeoutId);
        }, 30000); // Trigger every 30 seconds (reduced from 50000)

        // This return function is for the useEffect cleanup, not for the interval callback
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Link href="/" className='hidden md:block'>
            <style jsx global>{`
                @font-face {
                    font-family: 'CheltenhamCondensed';
                    src: url('/fonts/cheltenham-cond-normal-700.ttf') format('truetype');
                    font-weight: normal;
                    font-style: normal;
                    font-display: swap;
                }
            `}</style>

            <div className={`logo-hover-container flex items-center justify-center relative border-b border-gray-200 p-4 ${isFakeHover ? 'fake-hover' : ''}`}>
                <div className="logo-background absolute top-[37%] left-1/2 w-[285px] h-[25%] bg-[#EBEBEB] opacity-0 transform translate-y-[-50%] translate-x-[-50%] ml-[3px]"
                    style={{
                        transition: 'opacity 0.2s ease',
                        transitionDelay: '.8s',
                        marginLeft: locale === 'heb' ? '11px' : '3px',
                    }}
                />

                <div className="logo-text-right absolute left-1/2 top-[38%] transform translate-y-[-50%] font-serif text-2xl text-black z-10 opacity-0 transition-opacity duration-100 delay-50 pointer-events-none"
                    style={{
                        fontFamily: 'CheltenhamCondensed, serif',
                        fontSize: '2rem',
                        transform: `translateX(${locale === 'heb' ? '-120px' : '-130px'}) translateY(-50%)`,
                    }}>
                    THE
                </div>

                <Image className={`relative z-20 h-[165px] ${locale === 'heb' ? 'scale-x-[-1]' : ''} object-contain pb-2`}
                    src={currentLogo} alt="The Hear Logo" />

                <div className="logo-text-right absolute left-1/2 top-[38%] transform translate-y-[-50%] font-serif text-2xl text-black z-10 opacity-0 transition-opacity duration-100 delay-500 pointer-events-none"
                    style={{
                        fontFamily: 'CheltenhamCondensed, serif',
                        fontSize: '2rem',
                        transition: 'opacity 0.1s ease',
                        transitionDelay: '0.5s',
                        transform: `translateX(${locale === 'heb' ? '87px' : '80px'}) translateY(-50%)`,
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