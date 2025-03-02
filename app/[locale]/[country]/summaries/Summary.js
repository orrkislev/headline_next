import { useRef } from 'react';

export default function Summary({ summary, active, locale, setDate }) {
    const summaryRef = useRef(null);

    if (active && summaryRef.current) {
        summaryRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

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
    const timestamp = summary.timestamp.getHours() + ':' + (summary.timestamp.getMinutes() < 10 ? '0' : '') + summary.timestamp.getMinutes();

    const parts = text.split(/(\(.*?\))/g)

    const fontClass = locale === 'heb' ? 'frank-re' : 'font-roboto';

    return (
        <div
            ref={summaryRef}
            className={`py-2 ${fontClass} leading-none font-normal cursor-pointer ${active ? '' : 'text-gray-200 hover:text-gray-500 transition-colors'} border-b border-dashed border-gray-200 pb-5`}
            style={{
                color: active ? 'black' : '#e8e8e8',
                cursor: active ? 'default' : 'pointer',
                fontSize: active ? '17px' : '.9rem',
                fontWeight: 400,
                lineHeight: active ? '1.3' : '1.3',
            }}
            onClick={() => setDate(summary.timestamp)}
        >
            <div className={`${active ? 'text-blue' : ''} mb-2`}
                style={{
                    fontSize: active ? '1.25rem' : '1.15rem',
                    lineHeight: active ? '1.3' : '1.3',
                    marginTop: active ? '0px' : '12px',
                }}
            >
                <span className="font-mono">{timestamp}</span>
                <span className="mx-1">{locale == 'heb' ? '⇠' : '⇢'}</span>
                <span>{headline}</span>
            </div>
            {parts.map((part, i) => (
                <span key={i} className={
                    active ? (part.startsWith('(') ?
                        `text-blue ${locale === 'heb' ? 'text-sm' : 'text-xs'}` :
                        '') : ''
                }>
                    {part}
                </span>
            ))}
        </div>
    );
}