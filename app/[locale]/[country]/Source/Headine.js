import Link from "next/link";

export default function Headline({ headline, typography }) {
    if (!headline) return null;
    return (
        <Link href={headline.link} target="_blank">
            <div className={`animate-headline w-full text-lg font-semibold `}
                style={{ ...typography, width: '100%' }} key={headline.headline}>
                {headline.headline}
            </div>
        </Link>
    );
}