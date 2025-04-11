import { Route, Routes } from 'react-router-dom';
import LoginPage from '@auth/pages/LoginPage';
import RegisterPage from '@features/auth/pages/RegisterPage'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage/>} />
    </Routes>
  );
};

export default AuthRoutes;
