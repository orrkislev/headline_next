import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { ExpandLess, ExpandMore, PushPin, PushPinOutlined } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { useState } from "react";
import { useGlobalSort } from "@/utils/store";


export default function Content({ country, summary, locale, pinned }) {
    const [open, setOpen] = useState(true);
    const setPinnedCountries = useGlobalSort(state => state.setPinnedCountries)

    const minutes = summary.timestamp.getUTCMinutes();
    const hours = summary.timestamp.getUTCHours();

    // Format time to ensure two digits for minutes
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;

    let text = summary.summary;
    if (locale === 'heb') {
        text = summary.hebrewSummary;
    } else if (locale === 'translated') {
        text = summary ? summary.translatedSummary : '';
    }

    const pin = () => {
        let pinnedCountries = localStorage.getItem('pinnedCountries');
        console.log({ pinnedCountries })
        if (pinnedCountries) {
            pinnedCountries = JSON.parse(pinnedCountries);
            console.log({ pinnedCountries, country })
            if (pinnedCountries.indexOf(country) >= 0) {
                pinnedCountries.splice(pinnedCountries.indexOf(country), 1);
            } else {
                pinnedCountries.push(country);
            }
        } else pinnedCountries = [country];
        localStorage.setItem('pinnedCountries', JSON.stringify(pinnedCountries));
        setPinnedCountries(pinnedCountries);
    }

    return (
        <div className="p-4">
            <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p style={{
                        fontFamily: 'monospace',
                        fontWeight: 400,
                        fontSize: '0.85rem',
                        padding: 6,
                    }}>{formattedTime}</p>
                    <div className="h-4 w-px bg-gray-300"></div>
                    <TopBarButton onClick={pin} >
                        <CustomTooltip title="pin country in place">
                            {pinned >= 0 ? <PushPin style={{ fontSize: '0.7rem', color: 'blue' }} /> : <PushPinOutlined style={{ fontSize: '0.7rem' }} />}
                        </CustomTooltip>
                    </TopBarButton>
                </div>

                <TopBarButton onClick={() => setOpen(!open)}>
                    {open ? <ExpandLess color='gray' /> : <ExpandMore color='gray' />}
                </TopBarButton>
            </div>
            <Collapse in={open}>
                <div style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
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