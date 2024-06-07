import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { checkAuthentication } from '@/services/http/check-authentication/check-authentication';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["auth"] });
  }, [location, queryClient]);

  const { isSuccess, isError, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthentication,
    retry: false
  });

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <h1 className='w-60 text-center font-semibold text-2xl text-sky-950 p-2 border-4 border-sky-700 rounded-xl'>
          Aguarde enquanto verificamos sua autorização...
        </h1>
      </div>
    );
  }

  if (isSuccess) {
    return <>{children}</>;
  }

  return null;
};
