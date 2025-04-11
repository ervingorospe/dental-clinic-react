import { Route, Routes } from 'react-router-dom';
import LoginPage from '@auth/pages/LoginPage';
import RegisterPage from '@features/auth/pages/RegisterPage'
import NotFoundPage from '@pages/NotFoundPage'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AuthRoutes;
