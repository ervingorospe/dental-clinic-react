import { Route, Routes } from 'react-router-dom';
import DashboardPage from '@features/dashboard/pages/DashboardPage';
import DashboardLayout from '@layouts/DashboardLayout';
import ProfilePage from '@features/dashboard/pages/ProfilePage';
import NotFoundPage from '@pages/NotFoundPage'

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <DashboardLayout>
            <ProfilePage />
          </DashboardLayout>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default DashboardRoutes;
