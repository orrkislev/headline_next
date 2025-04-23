import { orderOptionLabels } from "@/utils/sources/getCountryData";
import PopUpCleaner from "@/components/PopUp";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const toggleButtonStyle = {
    padding: '4px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    fontSize: '0.8rem',
    fontWeight: 'normal',
    width: '100%',
};
export default function OrderMenu({ open, close, locale, order, setOrder }) {

    const handleSortChange = (event, newSortType) => {
        if (!newSortType) return;
        setOrder(newSortType)
    }

    if (!open) return null
    return (
        <>
            <PopUpCleaner open={open} close={close} />
            <div className={`absolute z-[1000] top-[-2em] ${locale == 'heb' ? 'left-0' : 'right-0'} mt-12 bg-white shadow-lg rounded-lg p-6 pt-4`} style={{ direction: 'ltr' }}>
                <div className="w-64 bg-white rounded-lg text-sm">
                    <div className="text-blue text-lg mb-2 font-['Geist']">Source Order</div>

                    <ToggleButtonGroup
                        orientation="vertical"
                        value={order}
                        exclusive
                        onChange={handleSortChange}
                        sx={{ width: '100%', mb: 2 }}
                    >
                        {Object.keys(orderOptionLabels).map(optionName => (
                            <ToggleButton key={optionName} value={optionName} sx={{ 
                                ...toggleButtonStyle,
                                fontFamily: "'Geist', sans-serif"
                            }}>
                                <div className="text-sm" style={{ fontFamily: "'Geist', sans-serif" }}>
                                    {orderOptionLabels[optionName]}
                                </div>
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>

                    <div className="text-sm font-['Geist']">
                        Sorting the sources can be done through:
                        (a) <span style={{ color: 'blue' }}>reputation</span> - the perceived credibility of the source,
                        (b) <span style={{ color: 'blue' }}>circulation</span> - the estimated number of readers,
                        (c) <span style={{ color: 'blue' }}>Left to Right</span> - placing "progressive" or left-leaning sources at the top, or
                        (d) <span style={{ color: 'blue' }}>Right to Left</span> - placing "conservative" and right-wing sources at the top.
                        The (e) <span style={{ color: 'blue' }}>default</span> view gives a selection of prominent sources, creating contrasts when possible.
                        <br /><br />
                        <div className="text-xs py-1 font-['Geist']" style={{ color: '#757575' }}>
                            * Notice that all these orders were determined mainly through AI assessments: they are not definitive lists or established rankings.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
