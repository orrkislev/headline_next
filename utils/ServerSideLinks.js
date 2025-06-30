import { countries } from "@/utils/sources/countries";

// Server-side headline links for SEO
export function ServerHeadlineLinks({ headlines, locale, country, date }) {
    if (!headlines || headlines.length === 0) return null;
    
    // Filter out internal links to prevent 404s
    const validExternalHeadlines = headlines.filter(headline => {
        if (!headline.link) return false;
        
        // Check if link points to our own domain
        const isInternalLink = headline.link.includes('the-hear.com') || 
                              headline.link.includes('www.the-hear.com') ||
                              headline.link.startsWith('/');
        
        return !isInternalLink;
    });
    
    if (validExternalHeadlines.length === 0) return null;
    
    return (
        <div style={{ display: 'none' }}>
            {/* Hidden server-rendered links for crawlers - external only */}
            {validExternalHeadlines.map((headline) => (
                <a 
                    key={headline.id}
                    href={headline.link}
                    rel="noopener noreferrer"
                    aria-hidden="true"
                >
                    {headline.headline}
                </a>
            ))}
        </div>
    );
}

// Server-side country navigation for SEO (Flag menu links)
export function ServerCountryNavigation({ locale, currentCountry }) {
    return (
        <div style={{ display: 'none' }}>
            {/* Hidden server-rendered country navigation for crawlers */}
            {Object.keys(countries)
                .filter(country => country !== currentCountry) // Exclude current country
                .map(country => (
                    <a 
                        key={country}
                        href={`https://www.the-hear.com/${locale}/${country}`}
                        aria-hidden="true"
                    >
                        {countries[country].english} News
                    </a>
                ))}
            <a 
                href={`https://www.the-hear.com/${locale}/global`}
                aria-hidden="true"
            >
                Global News
            </a>
        </div>
    );
}

// Server-side yesterday navigation for SEO (Yesterday summary link)
export function ServerYesterdayNavigation({ locale, country }) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const day = String(yesterday.getDate()).padStart(2, '0');
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const year = yesterday.getFullYear();
    const dateString = `${day}-${month}-${year}`;
    
    return (
        <div style={{ display: 'none' }}>
            {/* Hidden server-rendered yesterday navigation for crawlers */}
            <a 
                href={`https://www.the-hear.com/${locale}/${country}/${dateString}`}
                aria-hidden="true"
            >
                {country} news yesterday ({dateString})
            </a>
        </div>
    );
}


// Server-side date navigation for SEO (Previous/Next day links)
export function ServerDateNavigation({ locale, country, date }) {
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const today = new Date();
    
    function createDateString(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    
    return (
        <div style={{ display: 'none' }}>
            {/* Hidden server-rendered date navigation for crawlers */}
            <a 
                href={`https://www.the-hear.com/${locale}/${country}/${createDateString(yesterday)}`}
                aria-hidden="true"
            >
                Previous day: {createDateString(yesterday)}
            </a>
            
            {tomorrow <= today && (
                <a 
                    href={`https://www.the-hear.com/${locale}/${country}/${createDateString(tomorrow)}`}
                    aria-hidden="true"
                >
                    Next day: {createDateString(tomorrow)}
                </a>
            )}
            
            <a 
                href={`https://www.the-hear.com/${locale}/${country}`}
                aria-hidden="true"
            >
                Back to current: {country}
            </a>
        </div>
    );
} 