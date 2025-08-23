import { countries } from "@/utils/sources/countries";

export function createMetadata({ country, locale, year, month }) {
    const countryData = countries[country];
    if (!countryData) {
        return {
            title: 'Country not found',
            description: 'The requested country could not be found.'
        };
    }

    const countryName = locale === 'heb' ? countryData.hebrew : countryData.english;
    const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(
        locale === 'heb' ? 'he' : 'en', 
        { month: 'long', year: 'numeric' }
    );

    const isHebrew = locale === 'heb';
    
    const title = isHebrew 
        ? `ארכיון חדשות ${countryName} - ${monthName} | The Hear`
        : `${countryName} News Archive - ${monthName} | The Hear`;
    
    const description = isHebrew
        ? `צפה בכל הסיכומים היומיים של חדשות ${countryName} מ-${monthName}. ארכיון מלא של הידיעות והתפתחויות החשובות ביותר.`
        : `View all daily news summaries for ${countryName} from ${monthName}. Complete archive of the most important news and developments.`;

    const keywords = isHebrew
        ? `${countryName}, חדשות, ארכיון, ${monthName}, סיכומים יומיים, עיתונות`
        : `${countryName}, news, archive, ${monthName}, daily summaries, journalism`;

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            type: 'website',
            locale: isHebrew ? 'he_IL' : 'en_US',
            siteName: 'The Hear'
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description
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
            canonical: `https://www.the-hear.com/${locale}/${country}/history/${year}/${month}`,
            languages: {
                'en': `https://www.the-hear.com/en/${country}/history/${year}/${month}`,
                'he': `https://www.the-hear.com/heb/${country}/history/${year}/${month}`
            }
        }
    };
}