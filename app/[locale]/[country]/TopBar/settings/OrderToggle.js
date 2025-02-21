import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { SwapVert } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
// import { useRef, useState, useEffect } from 'react';
// import { useRecoilState, useSetRecoilState } from "recoil";
// import { globalDataAtom, sourceOrderAtom, activeWebsitesAtom } from "../../../utils/atoms";
// import DesignControlMenu from './DesignControlMenu';
// import { getOrderedSources } from '../Sources';
// import { useParams } from 'react-router-dom';
// import { getUserPreferences, saveUserPreferences } from '../../../utils/cookieUtils';

export default function OrderToggle() {
    // const { countryId } = useParams();
    // const [sourceOrder, setSourceOrder] = useRecoilState(sourceOrderAtom);
    // const [activeWebsites, setActiveWebsites] = useRecoilState(activeWebsitesAtom);
    // const [globalData, setGlobalData] = useRecoilState(globalDataAtom);
    // const [designControlOpen, setDesignControlOpen] = useState(false);
    // const filterButtonRef = useRef(null);

    // Keep only the preference saving effect
    // useEffect(() => {
    //     if (Object.keys(activeWebsites).length > 0) {
    //         saveUserPreferences(countryId, {
    //             sourceOrder,
    //             activeWebsites,
    //             displayOrder: globalData.displayOrder
    //         });
    //     }
    // }, [activeWebsites, sourceOrder, globalData.displayOrder, countryId]);

    // const handleSortTypeChange = (newSortType) => {
    //     const orderedSources = getOrderedSources(countryId, newSortType);
        
    //     const newActiveWebsites = {};
    //     const initialSources = orderedSources.slice(0, 6);
    //     initialSources.forEach(source => {
    //         newActiveWebsites[source] = true;
    //     });
        
    //     setSourceOrder(newSortType);
    //     setActiveWebsites(newActiveWebsites);
    //     setGlobalData(prev => ({
    //         ...prev,
    //         sourceOrder: newSortType,
    //         activeWebsites: newActiveWebsites,
    //         displayOrder: initialSources
    //     }));
        
    //     saveUserPreferences(countryId, {
    //         sourceOrder: newSortType,
    //         activeWebsites: newActiveWebsites,
    //         displayOrder: initialSources
    //     });
    // };

    // const handleLayoutChange = (newLayout) => {
    //     if (newLayout !== null) {
    //         setGlobalData(prev => ({ ...prev, layout: newLayout }));
    //     }
    // };

    // const handleFontChange = (event, newFont) => {
    //     if (newFont !== null) {
    //         setGlobalData(prev => ({ ...prev, selectedFont: newFont }));
    //     }
    // };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CustomTooltip 
                title="Sort the sources"
                placement="left"
            >
                <TopBarButton >
                    <SwapVert />
                </TopBarButton>
            </CustomTooltip>

            {/* <DesignControlMenu
                open={designControlOpen}
                onClose={() => setDesignControlOpen(false)}
                sortType={globalData.sourceOrder}
                setSortType={handleSortTypeChange}
                layout={globalData.layout}
                setLayout={handleLayoutChange}
                selectedFont={globalData.selectedFont}
                setSelectedFont={handleFontChange}
                anchorEl={filterButtonRef.current}
            /> */}
        </Box>
    );
}