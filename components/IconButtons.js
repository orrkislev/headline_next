import { IconButton, styled } from "@mui/material";

export const TopBarButton = styled(IconButton)({
    padding: '2px',
    color: '#757575',
    '& .MuiSvgIcon-root': {
        fontSize: '18px'
    }
});

export const SettingsIconButton = styled(IconButton)({
    position: 'relative',
    width: 24,
    height: 24,
    padding: '2px',
    '& .MuiSvgIcon-root': {
        fontSize: '18px'
    }
});