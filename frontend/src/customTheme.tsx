import { createTheme } from '@mui/material/styles';

// Custom theme based on the Radiant theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#003a7e', // Color for AppBar and Sidebar buttons
        },
        background: {
            default: '#F6F6F3', // Background color of the page
            paper: '#F6F6F3',   // Paper background color
        },
    },
    typography: {
        fontFamily: '"Inter", sans-serif',
        fontSize: 14,
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '1.75rem',
            fontWeight: 600,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#003a7e', // Background color for AppBar
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '8px 16px',
                    textTransform: 'none',
                    backgroundColor: '#90A6CC', // Set the default button color
                    color: '#ffffff', // Text color for buttons
                    '&:hover': {
                        backgroundColor: '#007bb5', // Color on hover
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow on hover
                    },
                    '&:active': {
                        backgroundColor: '#005f8a', // Color when pressed
                        boxShadow: 'none', // Remove shadow when pressed
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for contrast
                    transition: 'transform 0.2s, box-shadow 0.2s', // Add transition for hover effect
                    '&:hover': {
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Darker shadow on hover
                        transform: 'scale(1.02)', // Slightly scale up on hover
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#90A6CC', // Background color for the sidebar
                    color: '#000000', // Text color in sidebar
                    paddingTop: '20px',
                    overflow: 'visible', // Ensure content does not get cut off
                    '& a': {
                        color: '#textSecondary', // Link color in sidebar (black)
                        textDecoration: 'none', // Remove underline
                        padding: '10px 15px', // Add padding to links
                        display: 'block', // Make links block elements
                        transition: 'background-color 0.2s, font-size 0.2s, transform 0.2s', // Smooth transition for background color, font size, and transform
                        borderRadius: '0 20px 20px 0', // Round right corners
                        '&:hover': {
                            backgroundColor: '#90a6cc', // Color on hover
                            fontSize: '18px', // Increase font size on hover
                            paddingLeft: '10px', // Shift to the right on hover
                            transform: 'translateX(0px)', // Additional shift on hover
                        },
                        '&.Mui-selected': { // Active state for selected item
                            backgroundColor: '#005f8a', // Color when selected
                            fontSize: '18px', // Keep font size larger when selected
                            paddingLeft: '20px', // Shift to the right when selected
                            transform: 'translateX(5px)', // Additional shift when selected
                        },
                        '&:active': {
                            backgroundColor: '#003a7e', // Color when pressed
                        },
                    },
                },
            },
        },
    },
});

export default theme;
