import Link from "next/link";

export default function Headline({ country, locale, summary, typography, index }) {

    let headline = summary.englishHeadline;
    if (locale === 'heb') {
        headline = summary.hebrewHeadline || summary.headline
    } else if (locale === 'translated') {
        headline = summary ? (summary.translatedHeadline || summary.headline) : '';
    }

    typography.fontSize = index == 0 ? '4rem' : '3rem'

    return (
        <Link href={`/${locale}/${country}`}>
            <div className={`animate-headline w-full text-lg font-semibold break-words`}
                style={{ ...typography, width: '100%' }} key={summary.id}>
                {headline}
            </div>
        </Link>
    );
}