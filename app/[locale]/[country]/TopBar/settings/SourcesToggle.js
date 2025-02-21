// import { Box, IconButton, Typography, Popover, Tooltip } from "@mui/material";
// import SourcesGrid from './SourcesGrid';
import CustomTooltip from "@/components/CustomTooltip";
import { TopBarButton } from "@/components/IconButtons";
import { List } from "@mui/icons-material";
import { useState } from "react";

export default function SourcesToggle() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <CustomTooltip title="Select news sources" placement="left">
                <TopBarButton onClick={() => setOpen(true)}>
                    <List />
                </TopBarButton>
            </CustomTooltip>

            {/* <Popover
                open={settingsOpen}
                anchorEl={containerRef.current}
                onClose={() => setSettingsOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            marginTop: 1
                        }
                    }
                }}
            >
                <Box sx={{
                    width: '35vw',
                    height: '70vh',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}>
                    <SourcesGrid />
                </Box>
            </Popover> */}
        </div>
    );
}