export default function Summary({ summary, active, click }) {

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
        <div className={`p-4 serif`} onClick={click}>
            <div className={`${active ? 'text-blue-600' : 'text-gray-500'} font-bold text-lg`}>
                <span>{timestamp}</span>
                <span> ⇠ </span>
                <span>{headline}</span>
            </div>
            <br />
            {parts.map((part, i) => (
                <span key={i} className={
                    active ? (part.startsWith('(') ?
                        'text-gray-500 text-sm' :
                        'font-semibold') :
                        'text-gray-500'
                }>
                    {part}
                </span>
            ))}
        </div>
    );
}