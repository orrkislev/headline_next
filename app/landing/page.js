'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LandingPageContent from './LandingPage_content';
import TopBar from './TopBar';
import Footer from './footer';
import useMobile from "@/components/useMobile";

export default function Page() {
    const router = useRouter();
    const { isMobile, isLoading } = useMobile();

    // Redirect mobile users to mobile page
    useEffect(() => {
        if (!isLoading && isMobile) {
            router.replace('/mobile');
        }
    }, [isMobile, isLoading, router]);

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <main className="flex-grow">
                <LandingPageContent />
            </main>
            <Footer />
        </div>
    );
} 