import { getTypographyOptions } from "@/utils/typography/typography";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Headline({ country, summary, index }) {
    const { locale } = useParams()

    let typography = getTypographyOptions(locale == 'heb' ? 'Israel' : 'US')[0]
    typography = JSON.parse(JSON.stringify(typography))

    let headline = summary.englishHeadline;
    if (locale === 'heb') {
        headline = summary.hebrewHeadline || summary.headline
    } else if (locale === 'translated') {
        headline = summary ? (summary.translatedHeadline || summary.headline) : '';
    }

    if (index == 0) typography.fontSize = '4rem'

    return (
        <Link href={`/${locale}/${country}`}>
            <div className={`animate-headline w-full text-lg font-semibold break-words`}
                style={{ ...typography, width: '100%' }} key={summary.id}>
                {headline}
            </div>
        </Link>
    );
}