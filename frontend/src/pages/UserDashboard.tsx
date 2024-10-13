import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box, Card, CardContent, Grid } from '@mui/material';
import { useNotify, useDataProvider } from 'react-admin'; // Hooks de react-admin para notificaciones y crear en la base de datos

const UserDashboard = () => {
    const [donorName, setDonorName] = useState(''); // Estado para el nombre del donante
    const [amount, setAmount] = useState(''); // Estado para la cantidad
    const [loading, setLoading] = useState(false); // Estado para deshabilitar botón mientras se envía el formulario
    const notify = useNotify();
    const dataProvider = useDataProvider(); // Para acceder al dataProvider y realizar la operación create

    const handleSubmit = async () => {
        if (!donorName || !amount) {
            notify('Por favor, ingrese todos los campos', { type: 'warning' });
            return;
        }

        if (isNaN(Number(amount)) || Number(amount) <= 0) {
            notify('Ingrese una cantidad válida mayor que 0', { type: 'warning' });
            return;
        }

        try {
            setLoading(true); // Deshabilitar el botón mientras se realiza la operación

            // Crear una nueva donación en la base de datos usando el recurso 'user-donations'
            await dataProvider.create('user-donations', {
                data: { donorName, amount: Number(amount), date: new Date().toISOString().split('T')[0] }
            });

            notify('Donación creada exitosamente', { type: 'success' });

            // Limpiar los campos del formulario
            setDonorName('');
            setAmount('');
        } catch (error) {
            notify('Error al crear la donación', { type: 'error' });
        } finally {
            setLoading(false); // Habilitar el botón después de la operación
        }
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                {/* Sección "¿Quiénes Somos?" y tarjeta de Objetivo, Misión y Visión */}
                <Grid item xs={12} sm={6}>
                    <Paper sx={{ padding: 4, mt: 4 }}>
                        <Card sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    ¿Quiénes Somos?
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Somos la Fundación Sanders, una organización comprometida con el bienestar de la comunidad.
                                    Nuestro objetivo es proporcionar apoyo y recursos a quienes más lo necesitan, promoviendo
                                    el voluntariado y la solidaridad. Creemos en el poder de la colaboración y en la importancia
                                    de ayudar a los demás.
                                </Typography>
                            </CardContent>
                        </Card>

                        {/* Tarjeta consolidada de Objetivo, Misión y Visión */}
                        <Card sx={{ mt: 2 }}>
                            <CardContent>                                
                                <Typography variant="h6" component="div" gutterBottom>
                                    Objetivo
                                </Typography>
                                <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                                    Nuestro objetivo social se basa en desarrollar proyectos para contribuir a enfrentar los rezagos sociales en materia de salud sexual y reproductiva, nutrición comunitaria y abasto de agua.
                                </Typography>

                                <Typography variant="h6" component="div" gutterBottom>
                                    Misión
                                </Typography>
                                <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                                    Fomentar la salud sexual y reproductiva, la sana alimentación y el abasto de agua potable entre grupos más vulnerables de la sociedad, para prevenir y incidencia y prevalencia de embarazos no planificados, infecciones de transmisión sexual, así como padecimientos asociados a la malnutrición y al consumo de agua contaminada.
                                </Typography>

                                <Typography variant="h6" component="div" gutterBottom>
                                    Visión
                                </Typography>
                                <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                                    Fundación Sanders A.C. es un referente por su modelo de intervención preventiva para fomentar la salud sexual y reproductiva, la sana alimentación y el abasto de agua potable en grupos sociales en situación de vulnerabilidad, contribuyendo de esa manera a la construcción de condiciones de justicia social en México.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>

                {/* Sección de Donación */}
                <Grid item xs={12} sm={6}>
                    <Paper sx={{ padding: 4, mt: 4 }}>
                        <Typography variant="h4" gutterBottom>
                            Fundación Sanders - Agua para todos
                        </Typography>
                        <Box component="form" sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                value={donorName}
                                onChange={(e) => setDonorName(e.target.value)}
                                margin="normal"
                                disabled={loading} // Deshabilitar mientras se envía el formulario
                            />
                            <TextField
                                fullWidth
                                label="Cantidad a Donar"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                margin="normal"
                                type="number"
                                disabled={loading} // Deshabilitar mientras se envía el formulario
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                onClick={handleSubmit}
                                disabled={loading} // Deshabilitar el botón mientras se procesa la donación
                            >
                                {loading ? 'Procesando...' : 'Donar'}
                            </Button>
                        </Box>
                    </Paper>

                    {/* Espacio para la imagen debajo de la tarjeta de donación */}
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <img 
                            src="../images/cisternaSanders.jpg" 
                            alt="Descripción de la imagen" 
                            style={{ maxWidth: '100%', height: '450px' }} 
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserDashboard;
