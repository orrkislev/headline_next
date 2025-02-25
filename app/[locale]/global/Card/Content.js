import { TopBarButton } from "@/components/IconButtons";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";


export default function Content({ summary }) {
    const { locale } = useParams();
    const [open, setOpen] = useState(false);

    const minutes = summary.timestamp.getUTCMinutes();
    const hours = summary.timestamp.getUTCHours();


    let text = summary.summary;
    if (locale === 'heb') {
        text = summary.hebrewSummary;
    } else if (locale === 'translated') {
        text = summary ? summary.translatedSummary : '';
    }

    return (
        <div className="p-4">
            <div className="w-full flex justify-between items-center">
                <p>{hours}:{minutes}</p>
                <TopBarButton onClick={() => setOpen(!open)}>
                    {open ? <ExpandLess color='gray'/> : <ExpandMore color='gray'/>}
                </TopBarButton>
            </div>
            <Collapse in={open}>
                <div className="text-sm">
                    {text}
                </div>
            </Collapse>
        </div>
    );
}