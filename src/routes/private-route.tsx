

import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLogin = localStorage.getItem("token")

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  return isLogin ? children : null;
};

export default PrivateRoute;
