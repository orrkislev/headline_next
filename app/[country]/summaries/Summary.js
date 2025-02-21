import { useDate } from "@/components/TimeManager";

export default function Summary({ summary, active }) {
    const setDate = useDate((state) => state.setDate);

    if (!summary) return null;

    let text = summary.summary;
    let headline = summary.englishHeadline;
    // if (globalData.language === 'hebrew') {
    text = summary.hebrewSummary;
    headline = summary.hebrewHeadline || summary.headline
    // } else if (globalData.language === 'translated') {
    //   text = summary ? summary.translatedSummary : '';
    //   headline = summary ? (summary.translatedHeadline || summary.headline) : '';
    // }
    const timestamp = summary.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const parts = text.split(/(\(.*?\))/g)

    return (
        <div className={`py-4 frank-re leading-none font-normal cursor-pointer ${active ? '' : 'text-gray-200 hover:text-gray-500 transition-colors'}`}
            onClick={() => setDate(summary.timestamp)}
        >
            <div className={`text-lg ${active ? 'text-blue' : ''}`}>
                <span>{timestamp}</span>
                <span> ⇠ </span>
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