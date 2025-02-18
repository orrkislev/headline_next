export default function Headline({ headline, typography }) {
    const txt = headline ? headline.headline : 'Loading...';
    return (
        <div className="animate-headline w-full text-lg font-semibold"
            style={{ ...typography, width: '100%' }} key={txt}>
            {txt}
        </div>
    );
}