'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

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
            {showProgress && (
                <div className="fixed top-0 left-0 w-full">
                    <LinearProgress />
                </div>
            )}
        </>
    )
}