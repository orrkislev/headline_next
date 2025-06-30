import { checkRTL } from "@/utils/utils";
import { Skeleton } from "@mui/material";

export default function Headline({ headline, typography, isLoading }) {
    if (isLoading) {
        return (
            <div className="space-y-2">
                <Skeleton variant="text" width="95%" height="1.5rem" />
                <Skeleton variant="text" width="80%" height="3rem" />
                <Skeleton variant="text" width="60%" height="1.5rem" />
            </div>
        );
    }

    if (!headline.headline || headline.headline == '') return null;
    const txt = headline.headline;
    const isRTL = checkRTL(txt);
    
    // Check if link points to our own domain - if so, don't make it clickable
    const isInternalLink = headline.link && (
        headline.link.includes('the-hear.com') || 
        headline.link.includes('www.the-hear.com') ||
        headline.link.startsWith('/') // Relative URLs
    );
    
    const headlineContent = (
        <div className="relative">
            <h3 className={`animate-headline w-full text-lg font-semibold break-words line-clamp-6`}    
                style={{ ...typography, width: '100%', direction: isRTL ? 'rtl' : 'ltr' }} key={headline.id}>
                {txt}
            </h3>
        </div>
    );
    
    // Only wrap in link if it's a valid external URL
    if (headline.link && !isInternalLink) {
        return (
            <a href={headline.link} target="_blank" rel="noopener noreferrer">
                {headlineContent}
            </a>
        );
    }
    
    // Return headline without link if no valid external URL
    return headlineContent;
}