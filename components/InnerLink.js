'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import { createPortal } from "react-dom";

export default function InnerLink({ href, locale, children }) {
    const [showProgress, setShowProgress] = useState(false);

    useEffect(()=>{
        if (showProgress) {
            // reset the progress bar after when the url changes
            const handleRouteChange = () => {
                setShowProgress(false);
            }
            window.addEventListener('popstate', handleRouteChange);
            return () => {
                window.removeEventListener('popstate', handleRouteChange);
            }
        }
    },[showProgress])

    return (
        <>
            <Link href={href} hrefLang={locale} onClick={() => setShowProgress(true)}>
                {children}
            </Link>
            {showProgress && typeof window !== 'undefined' && createPortal(
                <div className="fixed inset-0 w-full h-full z-[9999] pointer-events-auto">
                    <div className="absolute inset-0 bg-white bg-opacity-40 animate-pulse transition-all duration-200" />
                    <div className="fixed top-0 left-0 w-full">
                        <LinearProgress color="inherit" sx={{ opacity: 0.8, backgroundColor: 'white', height: '2px' }} />
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}