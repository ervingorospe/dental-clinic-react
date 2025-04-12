import { Route, Routes } from 'react-router-dom';
import LoginPage from '@auth/pages/LoginPage';
import RegisterPage from '@features/auth/pages/RegisterPage'
import NotFoundPage from '@pages/NotFoundPage'
import HomePage from '@pages/HomePage';
import DefaultLayout from '@layouts/DefaultLayout'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AuthRoutes;
