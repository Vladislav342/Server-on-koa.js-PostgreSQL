import { labelsMainPage } from './constants';
import { labels } from '../common/constants';
import {
  Nav,
  RightNav,
  H1Unauth,
  DIV,
  Ul,
  Li,
  Arrows,
  Button,
  GlobalStyles,
} from '../common/styled';
import { ERoutes } from '../../enums/routes';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { connect } from 'react-redux';
import { RootState } from '../../store/index';
import { logOut, checkAuth } from '../../store/auth/authSlice';

interface MainPageI {
  authorization: boolean;
}

const mapStateToProps = (state: RootState) => ({
  value: state.authorization,
});

const mapDispatchToProps = {
  logOut,
  checkAuth,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export const MainPage = ({ authorization }: MainPageI) => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(state => state.authorization.login);

  return authorization ? (
    <>
      <GlobalStyles />
      <Nav>
        <RightNav>
          <Ul>
            <Li>
              <Button typeof="buttom" onClick={() => dispatch(logOut())}>
                {labels.logOut}
              </Button>
            </Li>
          </Ul>
        </RightNav>
      </Nav>
      <DIV>
        <H1Unauth>{`${labelsMainPage.headerAuth}, ${userName}`}</H1Unauth>
        <Ul>
          <Li>
            <Arrows href={ERoutes.Account}>{labels.account}</Arrows>
          </Li>
          <Li>
            <Arrows href={ERoutes.AboutMe}>{labels.aboutUs}</Arrows>
          </Li>
        </Ul>
      </DIV>
    </>
  ) : (
    <>
      <DIV>
        <H1Unauth>{labelsMainPage.headerUnauth}</H1Unauth>
        <Ul>
          <Li>
            <Arrows href={ERoutes.LogIn}>{labels.logIn}</Arrows>
          </Li>
          <Li>
            <Arrows href={ERoutes.SignIn}>{labels.signIn}</Arrows>
          </Li>
        </Ul>
      </DIV>
    </>
  );
};

export default connector(MainPage);
