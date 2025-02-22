import { useDate } from "@/components/TimeManager";
import { useParams } from "next/navigation";

export default function Summary({ summary, active }) {
    const setDate = useDate((state) => state.setDate);
    const { locale } = useParams()

    if (!summary) return null;

    let text = summary.summary;
    let headline = summary.englishHeadline;
    if (locale === 'heb') {
        text = summary.hebrewSummary;
        headline = summary.hebrewHeadline || summary.headline
    } else if (locale === 'translated') {
        text = summary ? summary.translatedSummary : '';
        headline = summary ? (summary.translatedHeadline || summary.headline) : '';
    }
    const timestamp = summary.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const parts = text.split(/(\(.*?\))/g)

    return (
        <div className={`py-4 frank-re leading-none font-normal cursor-pointer ${active ? '' : 'text-gray-200 hover:text-gray-500 transition-colors'}`}
            style={{
                color: active ? 'black' : '#e8e8e8',
                cursor: active ? 'default' : 'pointer',
                fontSize: active ? '1rem' : '.9rem',
                fontWeight: 400,
                lineHeight: active ? '1.3' : '1.3',
            }}
            onClick={() => setDate(summary.timestamp)}
        >
            <div className={`${active ? 'text-blue' : ''}`}
                style={{
                    fontSize: active ? '1.1rem' : '1rem',
                }}
            >
                <span>{timestamp}</span>
                <span> {locale == 'heb' ? ' ⇠' : '⇢ '}</span>
                <span>{headline}</span>
            </div>
            <br />
            {parts.map((part, i) => (
                <span key={i} className={
                    active ? (part.startsWith('(') ?
                        'text-gray-500 text-sm' :
                        '') : ''
                }>
                    {part}
                </span>
            ))}
        </div>
    );
}