import { checkRTL } from "@/utils/utils";
import { Skeleton } from "@mui/material";

export default function Headline({ headline, typography }) {
    if (!headline) return <Skeleton variant="text" width={200} />;
    const txt = headline.headline;
    const isRTL = checkRTL(txt);
    return (
        <a href={headline.link} target="_blank" rel="noopener noreferrer">
            <div className={`animate-headline w-full text-lg font-semibold break-words line-clamp-6`}    
                style={{ ...typography, width: '100%', direction: isRTL ? 'rtl' : 'ltr' }} key={headline.id}>
                {txt}
            </div>
        </a>
    );
}