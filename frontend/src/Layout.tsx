import type { ReactNode } from "react";
import { Layout as RALayout, Sidebar as RASidebar, CheckForApplicationUpdate } from "react-admin";
import { MyAppBar } from './MyAppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; // Importar Typography de MUI
import Grid from '@mui/material/Grid'; // Importar Grid de MUI

const Sidebar = (props: any) => (
  <RASidebar 
    {...props} 
    style={{ 
      marginTop: '20px',
      overflow: 'visible',
      backgroundColor: '#C7D2E5', // Cambia el color de fondo aquí
      borderRadius: '8px', // Esquinas redondeadas, si deseas
      width: '250px', // Ajusta el ancho según sea necesario
    }} 
  />
);

const Footer = () => (
  <Box
    component="footer"
    style={{
      backgroundColor: '#003a7e', // Color de fondo
      color: 'white',             // Color de texto
      padding: '10px 20px',       // Espaciado interno
      marginTop: '20px',          // Espacio superior
    }}
  >
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Typography variant="body2" component="div" style={{ textAlign: 'left', paddingLeft: '10px' }}>
          <strong>DIRECCIÓN</strong><br />
          Melchor Ocampo 193, Torre A, Piso 1,<br />
          CP 11300 Col. Verónica Anzures
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Box style={{ textAlign: 'center' }}>
          <Typography variant="body2" component="div">
            <strong>CORREO</strong><br />
            contacto@sanders.com.mx
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box style={{ textAlign: 'right', paddingRight: '10px' }}>
          <Typography variant="body2" component="div">
            <strong>TELÉFONO</strong><br />
            55 1707-6203<br />
            <strong>SOPORTE</strong><br />
            a01710879@tec.mx<br />
          </Typography>
        </Box>
      </Grid>
    </Grid>
    <Box textAlign="center" style={{ marginTop: '10px' }}>
      © 2024 Fundación Sanders - Todos los derechos reservados
    </Box>
  </Box>
);

export const Layout = ({ children }: { children: ReactNode }) => (
  <Box
    display="flex"
    flexDirection="column"
    minHeight="100vh" // Asegura que ocupe toda la altura de la ventana
  >
    <RALayout appBar={MyAppBar} sidebar={Sidebar}>
      <Box style={{ marginTop: '20px', padding: '10px 20px', flex: 1 }}>
        {children}
      </Box>
      <CheckForApplicationUpdate />
    </RALayout>
    <Footer /> {/* Colocar el Footer fuera de RALayout para que esté siempre abajo */}
  </Box>
);
