import { checkAuthentication } from '@/services/http/check-authentication/check-authentication';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const getAuth = async () => {
    const response = await checkAuthentication();
    setIsAuth(response);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      await getAuth();
    };
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isAuth === false) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  if (isAuth === null) {
    navigate('/login');
  }

  return isAuth ? children : null;
};
