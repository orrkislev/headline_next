'use client'

import Link from "next/link";
import { useState } from "react";
import { LinearProgress } from "@mui/material";

export default function InnerLink({ href, locale, children }) {
    const [showProgress, setShowProgress] = useState(false);

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