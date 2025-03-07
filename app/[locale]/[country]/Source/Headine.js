export default function Headline({ headline, typography, translation}) {
    if (!headline) return null;
    return (
        <a href={headline.link} target="_blank" rel="noopener noreferrer">
            <div className={`animate-headline w-full text-lg font-semibold break-words`}
                style={{ ...typography, width: '100%' }} key={headline.id}>
                {translation || headline.headline}
            </div>
        </a>
    );
}