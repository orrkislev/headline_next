import { InfoOutlined, PublicOutlined, SettingsOutlined } from "@mui/icons-material";
import { IconButton, styled, Tooltip } from "@mui/material";
import { countryToAlpha2 } from "country-to-iso";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Settings from "./settings/Settings";
import { TopBarButton } from "@/components/IconButtons";
import AboutMenu from "./AboutMenu";

export const getFlagUrl = (country, size = '16x12') => {
    const isoCountry = countryToAlpha2(country).toLowerCase();
    if (!isoCountry) return '';
    return `https://flagcdn.com/${size}/${isoCountry}.png`;
};

export function Flag({ country }) {
    const flagUrl = getFlagUrl(country);
    return (
        <div className="px-4 h-full flex items-center justify-center">
            <Image
                src={flagUrl}
                alt={`Flag of ${country}`}
                width={16}
                height={12}
                style={{
                    width: '1rem',
                    height: '0.75rem',
                    verticalAlign: 'middle',
                    cursor: 'pointer'
                }}
            />
        </div>
    );
}

export function Headline({ headline }) {
    return (
        <div className="h-full px-4 text-3xl"
            style={{ fontFamily: 'var(--font-frank-re)' }} >
            {headline}
        </div>
    );
}


const tooltipProps = {
    componentsProps: {
        tooltip: {
            sx: {
                fontWeight: 'normal',
                color: 'black',
                bgcolor: 'white',
                border: '1px solid #E0E0E0',
            }
        },
        arrow: {
            sx: {
                color: 'white',
                '&::before': {
                    border: '1px solid #E0E0E0'
                }
            }
        }
    }
};
export function Global() {

    return (
        <Tooltip title="to the global view" arrow {...tooltipProps}>
            <Link href="/global">
                <TopBarButton size="small">
                    <PublicOutlined />
                </TopBarButton>
            </Link>
        </Tooltip>
    );
}

export function Info() {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative">
            <Tooltip title="about the Hear" arrow {...tooltipProps}>
                <TopBarButton size="small" onClick={() => setOpen(prev => !prev)}>
                    <InfoOutlined />
                </TopBarButton>
            </Tooltip>
            <AboutMenu open={open} />
        </div>
    );
}

export function SettingsButton() {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative">
            <Tooltip title="Settings" arrow {...tooltipProps}>
                <TopBarButton size="small" onClick={() => setOpen(prev => !prev)}>
                    <SettingsOutlined />
                </TopBarButton>
            </Tooltip>
            <Settings open={open} />
        </div>
    );
}


