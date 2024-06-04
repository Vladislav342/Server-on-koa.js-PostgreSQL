/* eslint-disable react/react-in-jsx-scope */
import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../store/index';
import { logOut, checkAuth } from '../../store/auth/authSlice';
import { UserI } from '../../types/UserI';
import UserService from '../../services/UserService';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { labels } from '../common/constants';
import { labelsMainPage } from '../App/constants';
import { ERoutes } from '../../enums/routes';
import {
  DIV,
  ButtonSecEx,
  RightNav,
  Li,
  Nav,
  Ul,
  GlobalStyles,
  H1Unauth,
  HR,
} from '../common/styled';

const mapStateToProps = (state: RootState) => ({
  value: state.authorization,
});

const mapDispatchToProps = {
  logOut,
  checkAuth,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const Account: FC = () => {
  const [users, setUsers] = useState<UserI[]>([]);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.authorization);
  const navigate = useNavigate();
  const isAuthorized = user.isAuth;

  async function getAllUsers() {
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
    } catch (e) {}
  }

  useEffect(() => {
    if (!isAuthorized) {
      navigate(ERoutes.Root);
    }
  }, [isAuthorized, navigate]);

  return (
    <>
      <GlobalStyles />
      <Nav>
        <RightNav>
          <Ul>
            <Li>
              <ButtonSecEx onClick={() => dispatch(logOut())}>{labels.logOut}</ButtonSecEx>
            </Li>
            <Li>
              <ButtonSecEx onClick={() => navigate(ERoutes.Root)}>{labels.back}</ButtonSecEx>
            </Li>
          </Ul>
        </RightNav>
      </Nav>
      <DIV>
        <H1Unauth>{labelsMainPage.headerAuth}</H1Unauth>
        <ButtonSecEx onClick={getAllUsers}>{labels.getUsers}</ButtonSecEx>
        <HR />
        <Ul>
          {users.map(userStep => (
            <Li key={userStep.login}>
              <p>{userStep.login}</p>
            </Li>
          ))}
        </Ul>
      </DIV>
    </>
  );
};

export default connector(Account);
