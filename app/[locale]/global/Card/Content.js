import { TopBarButton } from "@/components/IconButtons";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { useState } from "react";


export default function Content({ summary, locale }) {
    const [open, setOpen] = useState(true);

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
                <div style={{
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    fontWeight: 200,
                    letterSpacing: '0.00938em',
                    direction: locale === 'heb' ? 'rtl' : 'ltr',
                    textAlign: locale === 'heb' ? 'right' : 'left',
                    fontSize: '0.95rem',
                    lineHeight: 1.4
                }}>

                    {text}
                </div>
            </Collapse>
        </div>
    );
}