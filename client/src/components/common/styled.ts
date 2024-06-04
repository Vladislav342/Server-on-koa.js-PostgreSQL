import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
   };

  body {
    width: 100%;
    height: 100vh;
    background: url(images.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: table;
    font-family: Quicksand;
  }
`;

export const Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 80px;
`;

export const RightNav = styled.div`
  float: right;
`;

export const Ul = styled.ul`
  list-style: none;
  padding: 1em 3em;
`;

export const Li = styled.li`
  display: inline-block;
  margin: 5px;
`;

export const Arrows = styled.a<{ arrowColor?: string }>`
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border: 1px solid blue;
  border-radius: 4px;
  margin-left: 20px;
  color: ${props => props.arrowColor || 'black'};
`;

export const Form = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  margin: 50px 40px;
  background: rgb(0, 0, 0, 0);
  border: none;
  border-bottom: 1px solid #0078ff;

  ::-webkit-input-placeholder {
    color: #eaeaea;
    font-size: 12px;
    letter-spacing: 2px;
  }
`;

export const Button = styled.button`
  padding: 20px 32px;
  font-size: 16px;
  background: #0078ff;
  border: none;
  border-radius: 4px;
  margin-top: 30px;
  color: #fff;
`;

export const ButtonSecEx = styled.button`
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border: 1px solid blue;
  border-radius: 4px;
  margin-left: 20px;
  background-color: transparent;
  color: 'blue';
`;

export const H1Unauth = styled.h1`
  font-zise: 20px;
`;

export const DIV = styled.div`
  margin-top: 20%;
  text-align: center;
`;

export const P = styled.p`
  font-size: 14px;
`;

export const HR = styled.hr`
  color: black;
  width: 50%;
  size: 1px;
`;

export const H4Unauth = styled.h4`
  color: 'purple';
  font-zise: 16px;
`;
