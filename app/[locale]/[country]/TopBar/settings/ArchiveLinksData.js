import Link from "next/link";

const countryLaunchDates = {
    'israel': new Date('2024-07-04'),
    'germany': new Date('2024-07-28'),
    'us': new Date('2024-07-31'),
    'italy': new Date('2024-08-28'),
    'russia': new Date('2024-08-29'),
    'iran': new Date('2024-08-29'),
    'france': new Date('2024-08-29'),
    'lebanon': new Date('2024-08-29'),
    'poland': new Date('2024-08-30'),
    'uk': new Date('2024-09-05'),
    'india': new Date('2024-09-05'),
    'ukraine': new Date('2024-09-05'),
    'spain': new Date('2024-09-05'),
    'netherlands': new Date('2024-09-05'),
    'china': new Date('2024-09-06'),
    'japan': new Date('2024-09-07'),
    'turkey': new Date('2024-09-07'),
    'uae': new Date('2024-09-08'),
    'palestine': new Date('2024-09-10'),
    'finland': new Date('2025-02-20')
};

// Server-side component that always renders links in HTML
export default function ArchiveLinksData({ locale, country, className = "archive-nav-hidden" }) {
    const launchDate = countryLaunchDates[country] || new Date('2024-07-04');
    const now = new Date();
    
    // Generate list of available months from launch date to current month
    const months = [];
    let currentDate = new Date(launchDate.getFullYear(), launchDate.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth(), 1);

    while (currentDate <= endDate) {
        months.push({
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
            monthName: currentDate.toLocaleDateString('en', { month: 'long' })
        });
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return (
        <nav 
            id="archive-links-data" 
            className={className}
            aria-label="Historical news archives"
            style={{ direction: 'ltr' }}
        >
            <h2>Historical News Archives - {country}</h2>
            <ul>
                {months.reverse().map(month => (
                    <li key={`${month.year}-${month.month}`}>
                        <Link
                            href={`/${locale}/${country}/history/${month.year}/${month.month.toString().padStart(2, '0')}`}
                        >
                            {month.monthName} {month.year} news archive for {country}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}