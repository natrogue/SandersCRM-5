import * as React from 'react';
import { Admin, CustomRoutes, Resource } from 'react-admin'; 
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import AdminDashboard from './pages/AdminDashboard';  
import UserDashboard from './pages/UserDashboard';    
import { Route } from 'react-router-dom';             
import { DonacionesLineaList, DonacionesLineaCreate, DonacionesLineaEdit } from './pages/DonacionesLinea';
import { DonacionesEspecieList, DonacionesEspecieCreate, DonacionesEspecieEdit } from './pages/DonacionesEspecie';
import EstadisticasDonaciones from './pages/EstadisticasDonaciones';
import { Layout } from './Layout';
import theme from './customTheme'; // Import your custom theme

const App = () => {
  const [role, setRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedRole = localStorage.getItem('role');  // Get the user role from local storage
    setRole(storedRole);  // Set the role in state
  }, []);  // Runs once when the component mounts

  return (
    <Admin 
      authProvider={authProvider}
      dataProvider={dataProvider}
      theme={theme}  // Use your custom theme here
      dashboard={Dashboard}  // Use Dashboard for handling redirection
      loginPage={LoginPage}  // Login page
      layout={Layout}
    >
      <CustomRoutes>
        {/* Custom routes for admin and user */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />  
        <Route path="/user-dashboard" element={<UserDashboard />} />    
      </CustomRoutes>

      {/* Resources for CRM only for admin */}
      {role === 'admin' && (
        <>
          <Resource 
            name="donaciones-linea"
            list={DonacionesLineaList}
            edit={DonacionesLineaEdit}
          />
          <Resource 
            name="donaciones-especie"
            list={DonacionesEspecieList}
            create={DonacionesEspecieCreate}
            edit={DonacionesEspecieEdit}
          />
          <Resource 
            name="estadisticas"
            list={EstadisticasDonaciones}
          />
        </>
      )}
      {role === 'user' && (
        <>
          {/* Here you can add resources or components that only users can see */}
          <Route path="/user-dashboard" element={<UserDashboard />} />    
        </>
      )}
    </Admin>
  );
};

export default App;
