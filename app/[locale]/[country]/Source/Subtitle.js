import { Skeleton } from "@mui/material";

export default function Subtitle({headline}) {
    if (!headline) return (
        <div className="px-4 pb-6">
            <Skeleton variant="text" width={`${Math.floor(Math.random() * (50 - 10 + 1)) + 10}%`} />
        </div>
    );
    return (
        <div className={`px-4 pb-2`} style={{ fontSize: '0.8rem' }}>
            {headline.subtitle}
        </div>
    );
}