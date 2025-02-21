import CustomTooltip from '@/components/CustomTooltip';
import { TopBarButton } from '@/components/IconButtons';
import { usePreferences } from '@/components/PreferencesManager';
import { AppsSharp, DynamicFeedSharp } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export default function ViewToggle() {
    const view = usePreferences(state => state.view)
    const setView = usePreferences(state => state.setView)

    const isGridView = view === 'grid'

    return (
        <CustomTooltip 
            title={isGridView ? "switch to a feed view" : "back to the grid view"}
            placement="left"
        >
            <TopBarButton onClick={() => setView(isGridView ? 'feed' : 'grid')}>
                {isGridView ? <AppsSharp /> : <DynamicFeedSharp />}
            </TopBarButton>
        </CustomTooltip>
    );
}