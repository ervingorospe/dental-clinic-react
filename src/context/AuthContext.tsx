import React, { createContext, useContext, useState, useEffect, ReactNode  } from 'react';
import { checkAuthStatus } from '@utils/auth'
import { apiAuthLogout } from '@features/auth/api/auth'

interface IUser {
  userDetails: {
    firstName: string;
    lastName: string;
    phoneNumber:string;
    birthDate: string;
  }
} 
interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: () => void;
  logout: () => Promise<boolean>;
  updateUser: (data: IUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children } : any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getAuthStatus = async () => {
      const status = await checkAuthStatus();
      
      if (status.isAuthenticated) {
        setIsAuthenticated(true);
        setUser(status.user);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false)
    };

    getAuthStatus();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const updateUser = (data : IUser) => {
    setUser({...user, ...data.userDetails})
  }

  const logout = async () => {
    const response = await apiAuthLogout('/api/auth/logout');

    if (response.status !== 200) {
      return false;
    }
    
    setIsAuthenticated(false);
    setUser(null);
    return true;
  };

  if (loading) {
    return (
      <div>Loading....</div>
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
