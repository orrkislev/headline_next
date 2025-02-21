import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { Translate } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
// import TranslateIcon from '@mui/icons-material/Translate';
// import { useRecoilState, useRecoilValue } from "recoil";
// import { globalDataAtom, translationStateAtom, isGridViewAtom } from "../../../utils/atoms";
// import { useLocation } from 'react-router-dom';
// import { ltrExceptions, normalizeSourceName } from "../Sources";
// import untranslatableSources from '../../../utils/constants/Source_Json/untranslatableSources.json';
// import { useEffect } from 'react';

// Define paths that should not auto-translate
const NO_AUTO_TRANSLATE_PATHS = [
    '/country/uk',
    '/country/us',
    '/country/israel',
    '/heb/country/uk',
    '/heb/country/us',
    '/heb/country/israel'
];

export default function TranslateToggle() {
    // const [translationState, setTranslationState] = useRecoilState(translationStateAtom);
    // const globalData = useRecoilValue(globalDataAtom);
    // const isGridView = useRecoilValue(isGridViewAtom);
    // const location = useLocation();
    // const isHebrewSite = location.pathname.startsWith('/heb/');

    // useEffect(() => {
    //     if (!isGridView || !globalData.activeWebsites) return;

    //     // Debounce the auto-translation setup
    //     const timer = setTimeout(() => {
    //         if (NO_AUTO_TRANSLATE_PATHS.includes(location.pathname.toLowerCase())) {
    //             console.log('TranslateToggle: Path excluded from auto-translation');
    //             setTranslationState({});
    //             return;
    //         }

    //         // Get active sources that should be translated
    //         const activeSources = Object.keys(globalData.activeWebsites)
    //             .filter(source => {
    //                 const normalizedId = normalizeSourceName(source);
    //                 const isUntranslatable = Object.values(untranslatableSources.untranslatableSources)
    //                     .flat()
    //                     .includes(normalizedId);
    //                 const isLTRException = ltrExceptions.includes(normalizedId);

    //                 return globalData.activeWebsites[source] && 
    //                        !isUntranslatable && 
    //                        !isLTRException;
    //             });

    //         // Gradually enable translations for each source
    //         setTranslationState(prev => {
    //             // If we already have translations set up, don't change anything
    //             if (Object.keys(prev).length > 0) {
    //                 console.log('TranslateToggle: Translation state already exists, skipping');
    //                 return prev;
    //             }

    //             console.log('TranslateToggle: Setting up gradual translation for sources:', activeSources);

    //             // Start with an empty state
    //             const newState = {};

    //             // Schedule enabling translations for each source with a delay
    //             activeSources.forEach((source, index) => {
    //                 setTimeout(() => {
    //                     setTranslationState(current => ({
    //                         ...current,
    //                         [source]: true
    //                     }));
    //                 }, index * 500); // 500ms delay between each source
    //             });

    //             return newState;
    //         });
    //     }, 100);

    //     return () => clearTimeout(timer);
    // }, [location.pathname, globalData.activeWebsites, isGridView]);

    // const handleBulkTranslate = () => {
    //     if (!isGridView) return; // Prevent action in feed view

    //     // Get active sources that are translatable
    //     const activeSources = Object.keys(globalData.activeWebsites)
    //         .filter(source => {
    //             const normalizedId = normalizeSourceName(source);
    //             const isUntranslatable = Object.values(untranslatableSources.untranslatableSources)
    //                 .flat()
    //                 .includes(normalizedId);
    //             const isLTRException = ltrExceptions.includes(normalizedId);

    //             return globalData.activeWebsites[source] && 
    //                    !isUntranslatable && 
    //                    !isLTRException;
    //         });

    //     const newState = !isBulkTranslated;
    //     const newTranslationState = { ...translationState };

    //     activeSources.forEach(source => {
    //         newTranslationState[source] = newState;
    //     });

    //     setTranslationState(newTranslationState);
    // };

    // const isBulkTranslated = Object.keys(globalData.activeWebsites)
    //     .filter(source => {
    //         const normalizedId = normalizeSourceName(source);
    //         const isUntranslatable = Object.values(untranslatableSources.untranslatableSources)
    //             .flat()
    //             .includes(normalizedId);
    //         return globalData.activeWebsites[source] && !isUntranslatable;
    //     })
    //     .some(source => translationState[source]);

    return (
        <CustomTooltip
            // title={!isGridView ? "Translation not available in feed view" : 
            //       (isBulkTranslated ? "Back to original" : 
            //        isHebrewSite ? "תרגם כותרות" : "Translate headlines")}
            title="Translate"
            placement="left"
        >
            <TopBarButton>
                <Translate />
            </TopBarButton>
        </CustomTooltip>
    );
}