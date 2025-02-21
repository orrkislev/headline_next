import { Collapse } from "@mui/material";

export default function Subtitle({subtitle, showSubtitle}) {
    return (
        <Collapse in={showSubtitle} timeout="auto" unmountOnExit>
            <div className={`p-2 text-sm`}>
                {subtitle}
            </div>
        </Collapse>
    )
}