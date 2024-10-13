import React, { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { TextField, Button, Container, Typography, Box, Paper, Grid, Avatar, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const login = useLogin();
    const notify = useNotify();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login({ email, password });

            const auth = JSON.parse(localStorage.getItem('auth') || '{}');
            const userRole = auth.role;

            if (userRole === 'admin') {
                navigate('/admin-dashboard');
            } else if (userRole === 'user') {
                navigate('/user-dashboard');
            } else {
                navigate('/');
            }

            setLoading(false);
        } catch (error) {
            notify('Email o contraseña incorrecto');
            setLoading(false);
        }
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#003a7e', // Color de fondo del login
                padding: 0, // Eliminar padding
                margin: 0, // Eliminar margin
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#C7D2E5', position: 'relative' }}>
                <Grid container direction="column" alignItems="center">

                    {/* Agrega el logo */}
                    <Box component="img" src="../images/logoSanders.png" alt="Logo Fundación Sanders" sx={{ width: '270px', mb: 3 }} />


                    <Box component="form" onSubmit={submit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Correo electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                            startIcon={loading && <CircularProgress size={20} />}
                        >
                            {loading ? 'Entrando...' : 'Iniciar Sesión'}
                        </Button>
                    </Box>
                </Grid>
            </Paper>
        </Container>
    );
};

export default LoginPage;
