import React, { useState } from 'react';
import { TextField, Button, Container, Box, Paper, Grid, CircularProgress } from '@mui/material';
import { useNotify } from 'react-admin';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const notify = useNotify();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://localhost:5001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),  // Enviar email y contraseña
            });

            if (response.ok) {
                notify('Usuario registrado con éxito', { type: 'success' });
                navigate('/login');  // Redirigir al login tras el registro
            } else {
                const data = await response.json();
                notify(data.error || 'Error al registrar usuario', { type: 'error' });
            }
        } catch (error) {
            notify('Error en la conexión', { type: 'error' });
        } finally {
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
                    <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
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
                                style: { backgroundColor: '#fff' },
                            }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            placeholder="Contraseña"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{
                                style: { backgroundColor: '#fff' },
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
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </Button>
                    </Box>
                </Grid>
            </Paper>
        </Container>
    );
};

export default RegisterPage;