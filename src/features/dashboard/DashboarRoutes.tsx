import { Route, Routes } from 'react-router-dom';
import DashboardPage from '@features/dashboard/pages/DashboardPage';
import DashboardLayout from '@layouts/DashboardLayout';
import ProfilePage from '@features/dashboard/pages/ProfilePage';
import NotFoundPage from '@pages/NotFoundPage'
import BookingPage from '@features/dashboard/pages/BookingPage'
import ReschedulePage from '@features/dashboard/pages/ReschedulePage'
import AppointmentsPage from '@features/dashboard/pages/AppointmentsPage'
import { useAuth } from '@context/AuthContext';

const DashboardRoutes = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route
          path="/"
          element={ <DashboardPage />}
        />
        <Route
          path="/profile"
          element={<ProfilePage />}
        />
        {
          user.role !== 'doctor' && (
            <Route
              path="/booking"
              element={<BookingPage />}
            />
          )
        }
        
        <Route
          path="/reschedule/:appointmentId"
          element={<ReschedulePage />}
        />
        <Route
          path="/appointments"
          element={<AppointmentsPage />}
        />
      </Route>
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default DashboardRoutes;
