import LandingPageContent from './LandingPage_content';
import TopBar from './TopBar';
import Footer from './footer';

export const revalidate = 900 // 15 minutes

export default async function Page() {
    // Fetch any necessary data here if needed
    // For now, we'll just render the content component

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