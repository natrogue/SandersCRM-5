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
                    backgroundColor: '#F48D3E', // Set the default button color
                    color: '#ffffff', // Text color for buttons
                    '&:hover': {
                        backgroundColor: '#DE4E32', // Color on hover
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
                    color: '#003a7e', // Text color in sidebar
                    paddingTop: '20px',
                    height: '100%', // Change this to '100%'
                    minHeight: '100vh', // Ensure it covers the full viewport height
                    position: 'fixed', // Keep the sidebar fixed while scrolling
                    overflowY: 'auto', // Enable scrolling inside the sidebar
                    '& a': {
                        color: '#005f8a', // Link color in sidebar
                        textDecoration: 'none',
                        padding: '10px 15px',
                        display: 'block',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s, font-size 0.2s, transform 0.2s',
                        borderRadius: '0 200px 200px 0',
                        '&:hover': {
                            backgroundColor: '#90a6cc', // Background color on hover
                            fontSize: '18px',
                            paddingLeft: '10px',
                            transform: 'translateX(0px)',
                        },
                        '&.Mui-selected': {
                            backgroundColor: '#90a6cc', // Match the hover background color
                            color: '#005f8a', // Match the hover text color
                            fontSize: '18px', // Keep font size larger when selected
                            paddingLeft: '10px', // Shift to the right when selected
                            transform: 'translateX(0px)', // Match the hover transform
                        },
                        '&:active': {
                            backgroundColor: '#003a7e',
                        },
                    },
                    
                },
            },
        },
    },
});

export default theme;


