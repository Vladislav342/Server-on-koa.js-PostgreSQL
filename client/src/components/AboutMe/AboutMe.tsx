/* eslint-disable react/react-in-jsx-scope */
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../store/index';
import { logOut } from '../../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  DIV,
  ButtonSecEx,
  P,
  RightNav,
  Li,
  Nav,
  Ul,
  GlobalStyles,
  H1Unauth,
} from '../common/styled';
import { labels } from '../common/constants';
import { ERoutes } from '../../enums/routes';

/*const mapStateToProps = (state: RootState) => ({
    value: state.authorization,
});
const mapDispatchToProps = {
    logOut
};*/
//const connector = connect(mapStateToProps, mapDispatchToProps);

const AboutMe: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.authorization);
  const isAuthorized = user.isAuth;

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
        <H1Unauth>{labels.aboutUs}</H1Unauth>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </P>
      </DIV>
    </>
  );
};

// export default connector(AboutMe);

const CAboutMe = connect((state: RootState) => ({ authorization: state?.authorization }))(AboutMe);
export default CAboutMe;
