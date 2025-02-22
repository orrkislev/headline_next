import { getSourceName } from "@/utils/sources/source mapping"
import { useParams } from "next/navigation"

export default function SourceName({ website, typography }) {
    const { country } = useParams()

    const name = getSourceName(country, website)
    return (
        <span className="text-sm text-blue cursor-help" style={{ ...typography, fontSize: '1.2rem' }}>
            {name}
        </span>
    )
}