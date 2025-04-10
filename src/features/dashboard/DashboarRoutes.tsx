import { Route, Routes } from 'react-router-dom';
import DashboardPage from '@features/dashboard/pages/DashboardPage';
import DashboardLayout from '@layouts/DashboardLayout';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        }
      />
    </Routes>
  );
};

export default DashboardRoutes;
