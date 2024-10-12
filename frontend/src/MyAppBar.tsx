import { AppBar, TitlePortal } from 'react-admin';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; // Import Typography from MUI
import logo from '../images/logoSanders.png'; // Import the image

export const MyAppBar: React.FC = () => (
    <AppBar color="primary" style={{ width: '100%', padding: '10px 5px' }}>
        {/* Logo alineado a la izquierda */}
        <Box style={{ display: 'flex', alignItems: 'center', paddingRight: '20px' }}>
            <img src={logo} alt="Logo" style={{ height: '60px' }} />
        </Box>
        
        {/* Título del portal */}
        <TitlePortal />

        {/* Espaciado flexible para empujar los elementos a la derecha */}
        <Box flex="1" />

    </AppBar>
);


