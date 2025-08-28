export function createMetadata() {
    const url = 'https://www.the-hear.com/methodology';
    const siteName = 'The Hear';
    
    const title = 'Methodology | The Hear - How We Track & Analyze News Headlines';
    const description = 'Learn how The Hear tracks, aggregates, and analyzes news headlines in real time. Discover our methodology for monitoring main headlines from newspapers worldwide, AI-generated overviews, and archive creation process.';
    const keywords = 'news methodology, headline tracking, news analysis, AI overviews, news aggregation, media monitoring, journalism methodology, news archive, real time news tracking';

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            url,
            siteName,
            type: 'website',
            locale: 'en_US',
            images: [
                {
                    url: 'https://www.the-hear.com/logo192.png',
                    width: 192,
                    height: 192,
                    alt: `${siteName} logo`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://www.the-hear.com/logo512.png'],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        alternates: {
            canonical: url
        }
    };
}

export function LdJson() {
    const url = 'https://www.the-hear.com/methodology';
    const title = 'Methodology | The Hear - How We Track & Analyze News Headlines';
    const description = 'Learn how The Hear tracks, aggregates, and analyzes news headlines in real time. Discover our methodology for monitoring main headlines from newspapers worldwide, AI-generated overviews, and archive creation process.';
    const image = 'https://www.the-hear.com/logo192.png';
    
    // Create breadcrumb navigation
    const breadcrumbList = {
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'The Hear',
                'item': 'https://www.the-hear.com'
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Methodology',
                'item': url
            }
        ]
    };

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': url,
                'name': title,
                'description': description,
                'url': url,
                'inLanguage': 'en',
                'datePublished': '2024-07-04T00:00:00Z',
                'dateModified': new Date().toISOString(),
                'breadcrumb': {
                    '@id': `${url}#breadcrumb`
                },
                'publisher': {
                    '@type': 'NewsMediaOrganization',
                    'name': 'The Hear',
                    'logo': {
                        '@type': 'ImageObject',
                        'url': image
                    },
                    'url': 'https://www.the-hear.com'
                },
                'about': [
                    {
                        '@type': 'Thing',
                        'name': 'News Analysis Methodology',
                        'description': 'Methods and processes for tracking and analyzing news headlines'
                    },
                    {
                        '@type': 'Thing',
                        'name': 'AI-Generated News Overviews',
                        'description': 'Artificial intelligence processes for creating news summaries and overviews'
                    },
                    {
                        '@type': 'Thing',
                        'name': 'Real-time News Monitoring',
                        'description': 'Systems and processes for monitoring news headlines in real time'
                    }
                ]
            },
            breadcrumbList
        ]
    };
    
    return (
        <script 
            id="jsonld-methodology"
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
    );
}
