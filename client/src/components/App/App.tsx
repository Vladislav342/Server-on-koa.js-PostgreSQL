/* eslint-disable react/react-in-jsx-scope */
import { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Auth } from '../Auth/Auth';
import { SignIn } from '../Auth/SignIn';
import { MainPage } from './MainPage';
import { ERoutes } from '../../enums/routes';
import { PrivateRoute } from './PrivateRoute';
import AboutMe from '../AboutMe/AboutMe';
import Account from '../Account/Account';
import { useAppSelector } from '../../store/hook';
import { checkAuth } from '../../store/auth/authSlice';

export const App: FC = () => {
  const user = useAppSelector(state => state.authorization);
  const isAuthorized = user.isAuth;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
  }, []);

  return (
    <Routes>
      <Route path={ERoutes.Root} element={<PrivateRoute auth={isAuthorized} />}>
        <Route path={ERoutes.Root} element={<MainPage authorization={isAuthorized} />} />
        <Route path={ERoutes.Account} element={<Account />} />
        <Route path={ERoutes.AboutMe} element={<AboutMe />} />
      </Route>
      <Route path={ERoutes.LogIn} element={<Auth />} />
      <Route path={ERoutes.SignIn} element={<SignIn />} />
      {/*<Route path={ERoutes.Account} element={<Account />} />*/}
    </Routes>
  );
};
