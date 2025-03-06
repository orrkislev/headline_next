'use client';

import CustomTooltip from '@/components/CustomTooltip';
import { TopBarButton } from '@/components/IconButtons';
import { useView } from '@/utils/store';
import { AppsSharp, DynamicFeedSharp } from '@mui/icons-material';

export default function ViewToggle() {
    const { view, setView } = useView()
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