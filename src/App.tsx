import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@context/AuthContext';
import { ToastContainer } from 'react-toastify';
import AppRoutes from '@routes/AppRoutes';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
      
      <ToastContainer 
        position="top-center" 
        autoClose={10000} 
        hideProgressBar={false} 
        newestOnTop 
        closeOnClick 
        rtl={false}
      />
    </AuthProvider>
  );
};

export default App;
