import LandingPageContent from './LandingPage_content';

export const revalidate = 900 // 15 minutes

export default async function Page() {
    // Fetch any necessary data here if needed
    // For now, we'll just render the content component

    return (
        <LandingPageContent />
    );
} 