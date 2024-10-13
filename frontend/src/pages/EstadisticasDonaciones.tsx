import React, { useEffect, useState } from 'react';
import { useDataProvider } from 'react-admin';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Typography, Box, Paper, Grid, Card, CardContent } from '@mui/material';

const COLORS = ['#90a6cc', '#de4e32'];

const EstadisticasDonaciones = () => {
    const dataProvider = useDataProvider();
    const [donacionesLinea, setDonacionesLinea] = useState<any[]>([]);
    const [donacionesEspecie, setDonacionesEspecie] = useState<any[]>([]);

    useEffect(() => {
        // Obtener las donaciones en línea
        dataProvider.getList('donaciones-linea', { pagination: { page: 1, perPage: 100 }, sort: { field: 'date', order: 'DESC' } })
            .then(({ data }) => setDonacionesLinea(data));

        // Obtener las donaciones en especie
        dataProvider.getList('donaciones-especie', { pagination: { page: 1, perPage: 100 }, sort: { field: 'date', order: 'DESC' } })
            .then(({ data }) => setDonacionesEspecie(data));
    }, [dataProvider]);

    // Datos para el gráfico de pastel
    const dataForPieChart = [
        { name: 'Donaciones en Línea', value: donacionesLinea.length },
        { name: 'Donaciones en Especie', value: donacionesEspecie.length }
    ];

    // Datos para el gráfico de barras
    const dataForBarChart = [
        { name: 'Línea', amount: donacionesLinea.reduce((total, item) => total + item.amount, 0) },
        { name: 'Especie', amount: donacionesEspecie.reduce((total, item) => total + item.amount, 0) }
    ];

    // Calcular estadísticas adicionales
    const totalDonacionesLinea = donacionesLinea.reduce((total, item) => total + item.amount, 0);
    const totalDonacionesEspecie = donacionesEspecie.reduce((total, item) => total + item.amount, 0);
    const totalDonantes = new Set([...donacionesLinea, ...donacionesEspecie].map(d => d.donorId)).size;
    const promedioDonacion = ((totalDonacionesLinea + totalDonacionesEspecie) / (donacionesLinea.length + donacionesEspecie.length) || 0).toFixed(2);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold'}}>
                Estadísticas de Donaciones
            </Typography>

{/* Tarjetas de estadísticas adicionales */}
<Grid container spacing={3} sx={{ mb: 3 }}>
    <Grid item xs={12} md={3}>
        <Card sx={{ backgroundColor: '#fcddc5' }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Total en Línea
                </Typography>
                <Typography variant="h5">${totalDonacionesLinea.toFixed(2)}</Typography>
            </CardContent>
        </Card>
    </Grid>
    <Grid item xs={12} md={3}>
        <Card sx={{ backgroundColor: '#fcddc5' }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Total en Especie
                </Typography>
                <Typography variant="h5">${totalDonacionesEspecie.toFixed(2)}</Typography>
            </CardContent>
        </Card>
    </Grid>
    <Grid item xs={12} md={3}>
        <Card sx={{ backgroundColor: '#fcddc5' }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Número de Donantes
                </Typography>
                <Typography variant="h5">{totalDonantes}</Typography>
            </CardContent>
        </Card>
    </Grid>
    <Grid item xs={12} md={3}>
        <Card sx={{ backgroundColor: '#fcddc5' }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Promedio de Donación
                </Typography>
                <Typography variant="h5">${promedioDonacion}</Typography>
            </CardContent>
        </Card>
    </Grid>
</Grid>


            {/* Gráficos */}
            <Grid container spacing={3}>
                {/* Gráfico de pastel */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Proporción de Donaciones</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={dataForPieChart}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#de4e32"
                                    label
                                >
                                    {dataForPieChart.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Gráfico de barras */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total de Cantidades Donadas</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dataForBarChart}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="amount" fill="#f17f29" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EstadisticasDonaciones;
