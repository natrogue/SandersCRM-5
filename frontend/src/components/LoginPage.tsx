import React, { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { TextField, Button, Container, Box, Paper, Grid, CircularProgress } from '@mui/material';
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
                backgroundColor: '#C7D2E5',
                padding: 0,
                margin: 0,
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#003a7e', position: 'relative' }}>
                <Grid container direction="column" alignItems="center">
                    {/* Agrega el logo */}
                    <Box component="img" src="../images/logoSanders.png" alt="Logo Fundación Sanders" sx={{ width: '270px', mb: 3 }} />

                    <Box component="form" onSubmit={submit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            placeholder="Correo electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            InputProps={{
                                style: { backgroundColor: '#fff' }, // Fondo blanco
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            placeholder="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{
                                style: { backgroundColor: '#fff' }, // Fondo blanco
                            }}
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

                        {/* Botón de Registro */}
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            sx={{ mt: 2, width: '50%' }}
                            onClick={() => navigate('/register')}  // Redirige a la página de registro
                        >
                            ¿No tienes cuenta? ¡Regístrate aquí!
                        </Button>
                        </Box>
                    </Box>
                </Grid>
            </Paper>
        </Container>
    );
};

export default LoginPage;