import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@context/AuthContext'; 
import DashboardRoutes from '@features/dashboard/DashboarRoutes';
import AuthRoutes from '@features/auth/AuthRoutes';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <DashboardRoutes /> : <AuthRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
