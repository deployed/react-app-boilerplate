import styled, { keyframes } from 'styled-components';

import ReactLogoSVG from './react.svg';


export const Header = styled.div`
  padding: 10px;
  width: 100%;
  height: 200px;
  text-align: center;
  background-color: ${(props) => props.theme.palette.background.default};
  color: white;
  font-family: sans-serif;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const ReactLogo = styled(ReactLogoSVG)`
  animation: ${rotate360} infinite 20s linear;
  height: 80px;
  width: 80px;
`;
