import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import LandingPageContent from './Methodology_content';
import TopBar from './TopBar';
import Footer from './footer';
import { createMetadata, LdJson } from './metadata';

export async function generateMetadata() {
    return createMetadata();
}

export default async function Page() {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    
    // Server-side mobile detection - redirect mobile users to mobile page
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    if (isMobile) {
        redirect('/mobile');
    }

    return (
        <>
            {/* JSON-LD structured data for SEO */}
            <LdJson />
            
            {/* SSR page with proper links and content */}
            <div className="min-h-screen flex flex-col">
                <TopBar />
                <main className="flex-grow">
                    <LandingPageContent />
                </main>
                <Footer />
            </div>
        </>
    );
} 