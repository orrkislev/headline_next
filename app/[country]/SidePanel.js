import SideSlider from "./SideSlider";
import SummarySection from "./SummarySection";

export default function SidePanel({ summaries }) {
    return (
        <>
            <SideSlider summaries={summaries} />
            <SummarySection summaries={summaries} />
        </>
    );
}