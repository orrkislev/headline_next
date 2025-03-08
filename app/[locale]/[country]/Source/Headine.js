import { Skeleton } from "@mui/material";

export default function Headline({ headline, typography, translation }) {
    if (!headline) return <Skeleton variant="text" width={200} />;
    const txt = translation || headline.headline;
    const isRTL = /[\u0590-\u05FF\u0600-\u06FF]/.test(txt)
    return (
        <a href={headline.link} target="_blank" rel="noopener noreferrer">
            <div className={`animate-headline w-full text-lg font-semibold break-words`}    
                style={{ ...typography, width: '100%', direction: isRTL ? 'rtl' : 'ltr' }} key={headline.id}>
                {txt}
            </div>
        </a>
    );
}