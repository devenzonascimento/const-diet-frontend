import { LoginPage } from '@/pages/Login/page';
import { checkAuthentication } from '@/services/http/check-authentication/check-authentication';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {

  const navigate = useNavigate();

  const { isSuccess, isError, isPending } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthentication,
  })

  if (isPending) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <h1 className='w-60 text-center font-semibold text-2xl text-sky-950 p-2 border-4 border-sky-700 rounded-xl'>Aguarde enquanto verificamos sua autorização...</h1>
      </div>
    )
  }

  if (isError) {
    return navigate("/login")
  }

  if (isSuccess) {
    return children;
  }
};
