import * as React from 'react';
import { Admin, CustomRoutes, Resource } from 'react-admin'; 
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import AdminDashboard from './pages/AdminDashboard';  
import UserDashboard from './pages/UserDashboard';    
import { Route, Routes, BrowserRouter } from 'react-router-dom';  // Añadir BrowserRouter y Routes
import { DonacionesLineaList, DonacionesLineaCreate, DonacionesLineaEdit } from './pages/DonacionesLinea';
import { DonacionesEspecieList, DonacionesEspecieCreate, DonacionesEspecieEdit } from './pages/DonacionesEspecie';
import EstadisticasDonaciones from './pages/EstadisticasDonaciones';
import { Layout } from './Layout';
import theme from './customTheme'; 
import RegisterPage from './components/RegisterPage';  // Importar la página de registro

const App = () => {
  const [role, setRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedRole = localStorage.getItem('role');  // Get the user role from local storage
    setRole(storedRole);  // Set the role in state
  }, []);  // Runs once when the component mounts

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de registro que se renderiza fuera del Admin */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Resto de la aplicación envuelta en Admin */}
        <Route 
          path="/*" 
          element={
            <Admin 
              authProvider={authProvider}
              dataProvider={dataProvider}
              theme={theme}
              dashboard={Dashboard}
              loginPage={LoginPage}
              layout={Layout}
            >
              <CustomRoutes>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />  
                <Route path="/user-dashboard" element={<UserDashboard />} />
              </CustomRoutes>

              {role === 'admin' && (
                <>
                  <Resource 
                    name="donaciones-linea"
                    list={DonacionesLineaList}
                    edit={DonacionesLineaEdit}
                    options={{ label: 'Donaciones Online' }}
                  />
                  <Resource 
                    name="donaciones-especie"
                    list={DonacionesEspecieList}
                    create={DonacionesEspecieCreate}
                    edit={DonacionesEspecieEdit}
                    options={{ label: 'Donaciones Especie' }}
                  />
                  <Resource 
                    name="estadisticas"
                    list={EstadisticasDonaciones}
                  />
                </>
              )}
              {role === 'user' && (
                <>
                  <Route path="/user-dashboard" element={<UserDashboard />} />    
                </>
              )}
            </Admin>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;