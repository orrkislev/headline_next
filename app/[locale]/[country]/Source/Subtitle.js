import { Skeleton } from "@mui/material";

export default function Subtitle({headline}) {
    if (!headline) return <Skeleton variant="text" width={200} />;
    return (
        <div className={`px-4 pb-2`} style={{ fontSize: '0.8rem' }}>
            {headline.subtitle}
        </div>
    );
}