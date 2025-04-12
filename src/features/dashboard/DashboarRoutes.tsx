import { Route, Routes } from 'react-router-dom';
import DashboardPage from '@features/dashboard/pages/DashboardPage';
import DashboardLayout from '@layouts/DashboardLayout';
import ProfilePage from '@features/dashboard/pages/ProfilePage';
import HomePage from '@features/dashboard/pages/HomePage';
import NotFoundPage from '@pages/NotFoundPage'
import BookingPage from '@features/dashboard/pages/BookingPage'

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout>
            <HomePage />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard"
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
      <Route
        path="/booking"
        element={
          <DashboardLayout>
            <BookingPage />
          </DashboardLayout>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default DashboardRoutes;
