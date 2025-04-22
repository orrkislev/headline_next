import { checkRTL } from "@/utils/utils";

export default function Headline({ headline, typography, loading }) {
    if (!headline.headline || headline.headline == '') return null;
    const txt = headline.headline;
    const isRTL = checkRTL(txt);
    
    return (
        <a href={headline.link} target="_blank" rel="noopener noreferrer">
            <div className="relative">
                <div className={`animate-headline w-full text-lg font-semibold break-words line-clamp-6`}    
                    style={{ ...typography, width: '100%', direction: isRTL ? 'rtl' : 'ltr' }} key={headline.id}>
                    {loading && (
                        <span className="inline-block mr-2">
                            <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                        </span>
                    )}
                    {txt}
                </div>
            </div>
        </a>
    );
}