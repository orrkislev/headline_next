import { ExpandLess } from "@mui/icons-material";
import { Divider, IconButton } from "@mui/material";
import Image from "next/image";

export function SourceFooter({ headline, url, setShowSubtitle, showSubtitle }) {

    let timeString = '';
    if (headline) timeString = headline.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    return (
        <div className="flex justify-between items-center gap-4 bg-white p-1 px-2">
            <div className="flex gap-4 items-center">
                <Image src={`https://www.google.com/s2/favicons?sz=64&domain=${url}`}
                    width={16} height={16} alt=""
                    style={{
                        verticalAlign: 'middle'
                    }}
                />
                <Divider orientation="vertical" flexItem />
            </div>
            <div className="flex gap-4 items-center">
                <div className="text-[0.7em] text-gray-400">{timeString}</div>
                <Divider orientation="vertical" flexItem />
                <ExpandButton active={showSubtitle} click={() => setShowSubtitle(!showSubtitle)} />
            </div>
        </div>
    );
}
const ExpandButton = ({ active, click }) => (
    <IconButton
        onClick={() => click()}
        aria-expanded={active}
        aria-label="show more"
        sx={{
            padding: 0,
            width: '16px',
            height: '16px',
        }}
    >
        <ExpandLess
            sx={{
                transform: active ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
                color: 'text.secondary',
            }}
        />
    </IconButton>
);