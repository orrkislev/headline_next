import React, { useEffect, useState } from 'react';
import logoA from './logo/logo-head.png';
import logoB from './logo/logo-head-2.png';
import logoC from './logo/logo-head-4.png';
import Link from 'next/link';
import Image from 'next/image';

export default function DynamicLogo() {
    const hasRedHeadlines = false //
    const [currentLogo, setCurrentLogo] = useState(logoA);
    const [isFakeHover, setIsFakeHover] = useState(true);

    useEffect(() => {
        if (hasRedHeadlines) {
            setCurrentLogo(logoB);
        } else {
            setCurrentLogo(logoC);
            const timer = setTimeout(() => {
                setCurrentLogo(logoA);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [hasRedHeadlines]);

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
        <Link href="/">
            <div className='logo-hover-container flex items-center justify-center relative border-b border-gray-200 p-4'>
                <div className='logo-background'
                style={{
                    position: 'absolute',
                    left: '0', right: '0',
                    top: '25%', height: '30%',
                    backgroundColor: '#EBEBEB',
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                    transitionDelay: '0.8s',
                    zIndex: 0
                }} />
                <div className="logo-text-left" style={{
                    position: 'absolute',
                    left: '10%',
                    top: '25%',
                    fontFamily: '"cheltenham", serif',
                    fontSize: '2rem',
                    color: 'black',
                    zIndex: 1,
                    opacity: 0,
                    transition: 'opacity 0.1s ease',
                    pointerEvents: 'none'
                }}>
                    THE
                </div>
                <Image
                    src={currentLogo}
                    alt="The Hear Logo"
                    style={{
                        height: '160px',
                        width: 'auto',
                        transform: 'scaleX(-1)',
                        objectFit: 'contain',
                        position: 'relative',
                        zIndex: 2,
                        paddingBottom: '1'
                    }}
                />
                <div className="logo-text-right" style={{
                    position: 'absolute',
                    right: '5%',
                    top: '25%',
                    fontFamily: '"cheltenham", serif',
                    fontSize: '2rem',
                    color: 'black',
                    zIndex: 1,
                    opacity: 0,
                    transition: 'opacity 0.1s ease',
                    transitionDelay: '0.5s',
                    pointerEvents: 'none'
                }}>
                    HEAR
                </div>
            </div>
            <style>{`
                .logo-hover-container:hover .logo-text-left,
                .summary-section:hover .summary-hover-target .logo-text-left,
                .fake-hover .logo-text-left {
                    opacity: 1 !important;
                }
                .logo-hover-container:hover .logo-text-right,
                .summary-section:hover .summary-hover-target .logo-text-right,
                .fake-hover .logo-text-right {
                    opacity: 1 !important;
                }
                .logo-hover-container:hover .logo-background,
                .summary-section:hover .summary-hover-target .logo-background,
                .fake-hover .logo-background {
                    opacity: 1 !important;
                }
            `}</style>
        </Link>
    );
};