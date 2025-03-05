import Image from "next/image";

export function SourceFooter({ headline, url, headlines }) {
    let timeString = '';
    if (headline) {
        timeString = headline.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        
        // Find the next headline if it exists
        if (headlines) {
            const currentIndex = headlines.findIndex(h => h === headline);
            const nextHeadline = currentIndex > 0 ? headlines[currentIndex - 1] : null;
            
            if (nextHeadline) {
                const nextTimeString = nextHeadline.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    hour12: false 
                });
                // Add LRM character to prevent RTL flipping
                timeString = `\u200E${timeString} - ${nextTimeString}`;
            }
        }
    }

    return (
        <div className="flex justify-between items-center gap-4 bg-white p-2 px-2">
            <div className="flex gap-2 items-center">
                <Image src={`https://www.google.com/s2/favicons?sz=64&domain=${url}`}
                    width={16} height={16} alt=""
                    style={{
                        verticalAlign: 'middle'
                    }}
                />
                <div className="w-1 h-full bg-gray-300"></div>
            </div>
            <div className="flex gap-4 items-center">
                <div className="text-[0.7em] text-gray-400">{timeString}</div>
            </div>
        </div>
    );
}