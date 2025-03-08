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
                <p style={{
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    padding: 6,
                }}>{hours}:{minutes}</p>
                <TopBarButton onClick={() => setOpen(!open)}>
                    {open ? <ExpandLess color='gray'/> : <ExpandMore color='gray'/>}
                </TopBarButton>
            </div>
            <Collapse in={open}>
                <div style={{
                    fontFamily: locale === 'heb' ? 'sans-serif' : 'Roboto, sans-serif',
                    fontWeight: 200,
                    padding: 6,
                    direction: locale === 'heb' ? 'rtl' : 'ltr',
                    textAlign: locale === 'heb' ? 'right' : 'left',
                    fontSize: '0.95rem',
                    lineHeight: 1.4
                }}>
                    {text.split(/(\([^)]+\))/g).map((part, index) => 
                        part.startsWith('(') && part.endsWith(')') ? (
                            <span key={index} style={{ fontSize: '0.75rem', color: 'grey' }}>
                                {part}
                            </span>
                        ) : (
                            part
                        )
                    )}
                </div>
            </Collapse>
        </div>
    );
}