import { Card, CardActions, CardContent, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => (
  <Grid container spacing={2}>
    {/* Sección "Quiénes Somos" */}
    <Grid item xs={12}>
      <Card>
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
    </Grid>

    {/* Tarjetas de Objetivo, Misión y Visión en horizontal */}
    <Grid item xs={12} sm={4}>
      <Card style={{ height: '100%' }}> {/* Asegura que todas las tarjetas tengan la misma altura */}
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Objetivo
          </Typography>
          <Typography variant="body1" color="textSecondary">
          Nuestro objetivo social se basa en desarrollar proyectos para contribuir a enfrentar los rezagos sociales en materia de salud sexual y reproductiva, nutrición comunitaria y abasto de agua.
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={4}>
      <Card style={{ height: '100%' }}> {/* Asegura que todas las tarjetas tengan la misma altura */}
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Misión
          </Typography>
          <Typography variant="body1" color="textSecondary">
          Fomentar la salud sexual y reproductiva, la sana alimentación y el abasto de agua potable entre grupos más vulnerables de la sociedad, para prevenir y incidencia y prevalencia de embarazos no planificados, infecciones de transmisión sexual, así como padecimientos asociados a ala malnutrición y al consumo de agua contaminada.
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={4}>
      <Card style={{ height: '100%' }}> {/* Asegura que todas las tarjetas tengan la misma altura */}
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Visión
          </Typography>
          <Typography variant="body1" color="textSecondary">
          Fundación Sanders A.C. es un referente por su modelo de intervención preventiva para fomentar la salud sexual y reproductiva, la sana alimentación y el abasto de agua potable en grupos sociales en situación de vulnerabilidad, contribuyendo de esa manera a la construcción de condiciones de justicia social en México.
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    {/* Tarjetas de Donaciones */}
    <Grid item xs={12} sm={6}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Donaciones en especie
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to="/donaciones-especie"
            variant="contained"
            color="primary"
          >
            Ver Donaciones
          </Button>
        </CardActions>
      </Card>
    </Grid>
    
    <Grid item xs={12} sm={6}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Donaciones en línea
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to="/donaciones-linea"
            variant="contained"
            color="primary"
          >
            Ver Donaciones
          </Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
);

export default AdminDashboard;
