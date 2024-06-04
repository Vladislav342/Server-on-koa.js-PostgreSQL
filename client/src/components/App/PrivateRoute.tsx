import { Routes, Route, Outlet, useNavigate } from 'react-router-dom'; //useNavigate
import { useEffect } from 'react';
import { ERoutes } from '../../enums/routes';
import { MainPage } from './MainPage';

interface PrivateRouteI {
  auth: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteI> = ({ auth }: PrivateRouteI) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate(ERoutes.Root);
    }
  }, [auth, navigate]);

  return auth ? (
    <Outlet />
  ) : (
    <Routes>
      {' '}
      <Route path={'*'} element={<MainPage authorization={auth} />} />{' '}
    </Routes>
  );
};
