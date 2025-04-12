import { Route, Routes } from 'react-router-dom';
import DashboardPage from '@features/dashboard/pages/DashboardPage';
import DashboardLayout from '@layouts/DashboardLayout';
import ProfilePage from '@features/dashboard/pages/ProfilePage';
import HomePage from '@features/dashboard/pages/HomePage';
import NotFoundPage from '@pages/NotFoundPage'
import BookingPage from '@features/dashboard/pages/BookingPage'
import ReschedulePage from '@features/dashboard/pages/ReschedulePage'
import AppointmentsPage from '@features/dashboard/pages/AppointmentsPage'
import { useAuth } from '@context/AuthContext';

const DashboardRoutes = () => {
  const { user } = useAuth()

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
      {
        user.role !== 'doctor' && (
          <Route
            path="/booking"
            element={
              <DashboardLayout>
                <BookingPage />
              </DashboardLayout>
            }
          />
        )
      }
      
      <Route
        path="/reschedule/:appointmentId"
        element={
          <DashboardLayout>
            <ReschedulePage />
          </DashboardLayout>
        }
      />
      <Route
        path="/appointments"
        element={
          <DashboardLayout>
            <AppointmentsPage />
          </DashboardLayout>
        }
      />
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default DashboardRoutes;
