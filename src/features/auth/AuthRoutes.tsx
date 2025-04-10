import { Route, Routes } from 'react-router-dom';
import LoginPage from '@auth/pages/LoginPage';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default AuthRoutes;
