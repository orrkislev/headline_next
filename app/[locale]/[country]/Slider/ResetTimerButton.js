const { default: CustomTooltip } = require("@/components/CustomTooltip");
const { useDate } = require("@/components/TimeManager");
const { Restore } = require("@mui/icons-material");
const { IconButton } = require("@mui/material");
const { useParams } = require("next/navigation");

export default function ResetTimerButton() {
    const { locale } = useParams()
    const isPresent = useDate((state) => state.isPresent);
    const setDate = useDate((state) => state.setDate);

    const handleReset = () => {
        setDate(new Date());
    }


    const tooltip = locale === 'heb' ? 'בחזרה לעכשיו' : 'Reset To Now';
    const placement = locale === 'heb' ? 'left' : 'right';

    return (
        <CustomTooltip title={tooltip} arrow open={!isPresent} placement={placement}>
            <IconButton
                className={`transition-colors duration-300 ${isPresent ? '' : 'animate-slow-fade'}`}
                onClick={handleReset}
                size="small"
                sx={{
                    color: isPresent ? 'lightgray' : 'blue'
                }}
            >
                <Restore fontSize="small" />
            </IconButton>
        </CustomTooltip>
    )
}