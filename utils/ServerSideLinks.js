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
                .filter(country => {
                    // Temporarily exclude UAE as destination to prevent errors
                    // (UAE will only appear if someone is currently ON UAE and needs to navigate away, 
                    // but that's already filtered out by the first filter)
                    return country !== 'uae';
                })
                .map(country => (
                    <a 
                        key={country}
                        href={`https://www.the-hear.com/${locale}/${country}`}
                        aria-hidden="true"
                    >
                        {countries[country].english} News
                    </a>
                ))}
            {/* Always include global link unless we're already on global */}
            {currentCountry !== 'global' && (
                <a 
                    href={`https://www.the-hear.com/${locale}/global`}
                    aria-hidden="true"
                >
                    Global News
                </a>
            )}
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

// Server-side about content for SEO (About menu content)
export function ServerAboutContent() {
    return (
        <div style={{ display: 'none' }}>
            {/* Hidden server-rendered about content for crawlers */}
            <div aria-hidden="true">
                <h1>The Hear - Headline Dashboard and Archive</h1>
                <p>The Hear is headline dashboard and archive. It displays the main headlines of many newspapers, side by side, in real time and without curation.</p>
                
                <h2>The Operations Room</h2>
                <p>The Hear is a news operation room. Like a constantly-changing news-stand, the Hear lets you see the news as they evolve, across sources and across countries.</p>
                
                <h2>The Landscape as a Whole</h2>
                <p>The Hear is not curated and not personalized. Instead of trying to select the bits and pieces that might interest you, it attempts to give a view of the landscape as a whole. Instead of making its own editorial decisions, it listens to the decisions made by human editors as to what constitutes "the main story" worthy of your attention. In this, the Hear is an objective news aggregator.</p>
                
                <h2>A Headline Archive</h2>
                <p>The Hear is an archive of main headlines. It lets users navigate back in time to replay the news as they unfolded. It records history as it happened. Like a historic newspaper archive, the Hear is a library and collection of the main headlines of digital newspapers.</p>
                
                <h2>A thinking Newsstand</h2>
                <p>The Hear doesn't just display the headlines, but also reads them: it is embedded with AI throughout. With strategically placed and continuously updating overviews, summaries and reports, the Hear helps the reader digest the many headlines as they unravel. With daily overviews, it also writes history as it unfolds. The Hear is a news-stand equipped with a brain.</p>
                
                <h2>The Tower of Babel</h2>
                <p>The Hear translates headlines in real-time. It makes the news landscape in many countries immediately accessible in English, without selection or commentary. It lifts language barriers and gives an unfiltered view of what is currently being discussed around planet earth.</p>
                
                <h2>The One-Thing</h2>
                <p>the Hear displays main headlines. In the fuss and hubbub of the world, the main headline is the editor's choice of the single most important story happening now: the main headline is the one-thing. The Hear is a meta-newspaper made solely of such one-things, organized and contextualized.</p>
                
                <h2>A Context Machine</h2>
                <p>The Hear contextualizes the headlines. It does this by placing the headlines in relation to each other, to their predecessors, and to their global peers. In the Hear, each tree is seen against the background of the forest.</p>
                
                <h2>Ambient News</h2>
                <p>The Hear is meant to exist quietly, in the background, on your second screen. It allows users to follow the news from a distance, with a healthy sense of aloofness, and without scrolling.</p>
                
                <p>The Hear is Available for 20 Countries.</p>
                
                <span>news aggregator, headline archive, newsstand, news dashboard, main headlines, newspapers, real time news, news operation room, objective news aggregator, historic newspaper archive, AI news, news summaries, translate headlines, meta-newspaper, news context, ambient news</span>
            </div>
        </div>
    );
}

// Server-side country-specific SEO content (H1/H2 structure)
export function ServerCountrySEOContent({ locale, country }) {
    const countryData = countries[country] || {};
    const countryName = locale === 'heb' ? countryData.hebrew || country : countryData.english || country;
    
    // Handle global page differently
    if (country === 'global') {
        return (
            <div style={{ display: 'none' }}>
                {/* Hidden server-rendered global SEO content for crawlers */}
                <div aria-hidden="true">
                    <h1>Global Headlines | Live news dashboard </h1>
                    <h2>International news from major newspapers worldwide, updated throughout the day</h2>
                    <h3>World news headlines from multiple countries, updated in real time</h3>
                    <p>Breaking news and headlines from around the globe. The Hear aggregates main headlines from newspapers and news sources worldwide, providing a comprehensive view of global current events and developing stories.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div style={{ display: 'none' }}>
            {/* Hidden server-rendered country SEO content for crawlers */}
            <div aria-hidden="true">
                <h1>Live Headlines from {countryName} | a news dashboard and archive</h1>
                <h2>Current news from {countryName} newspapers, updated throughout the day</h2>
                <h3>{countryName} news headlines in real time</h3>
                <p>breaking news and headlines from {countryName}. The Hear aggregates main headlines from newspapers and news sources across {countryName}, providing a comprehensive view of current events and developing stories.</p>
            </div>
        </div>
    );
} 