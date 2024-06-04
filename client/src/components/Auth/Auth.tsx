import { Nav, RightNav, Ul, Li, Arrows, GlobalStyles, Form, Input, Button } from '../common/styled';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { labels } from '../common/constants';
import { ERoutes } from '../../enums/routes';
import { logIn } from '../../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hook';

export const Auth = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.authorization);
  const isAuthorized = user.isAuth;

  useEffect(() => {
    if (isAuthorized) {
      navigate(ERoutes.Root);
    }
  }, [isAuthorized, navigate]);

  return (
    <div>
      <GlobalStyles />
      <Nav>
        <RightNav>
          <Ul>
            <Li>
              <Arrows href={ERoutes.Root} arrowColor={'blue'}>
                {labels.back}
              </Arrows>
            </Li>
          </Ul>
        </RightNav>
      </Nav>
      <Form>
        <Input
          onChange={e => setLogin(e.target.value)}
          value={login}
          type="text"
          placeholder="Login"
        />
        <Input
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="text"
          placeholder="Password"
        />
        <Button typeof="buttom" onClick={() => dispatch(logIn({ login, password }))}>
          {labels.logIn}
        </Button>
      </Form>
    </div>
  );
};
