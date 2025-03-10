import FlagIcon from "@/components/FlagIcon"
import { countries } from "@/utils/sources/countries"
import { Divider } from "@mui/material"
import { useParams } from "next/navigation"

export default function CountryName({ country, typography}) {
    const { locale } = useParams()

    return (
        <span className="flex items-center gap-2 text-sm text-blue cursor-help pt-1 px-1" style={{ ...typography, fontSize: '1.2rem' }}>
            {locale == 'heb' ? countries[country].hebrew : countries[country].english}
            <Divider orientation="vertical" flexItem />
            <div className="px-1">
                <FlagIcon country={country} />
            </div>
        </span>
    )
}