import { useAuth } from '@context/AuthContext'; 
import DashboardRoutes from '@features/dashboard/DashboarRoutes';
import AuthRoutes from '@features/auth/AuthRoutes';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Public Routes */}
      {!isAuthenticated && <AuthRoutes />}

      {/* Private Routes */}
      {isAuthenticated && <DashboardRoutes />}
    </>
  );
};

export default AppRoutes;
