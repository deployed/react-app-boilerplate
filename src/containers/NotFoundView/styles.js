import styled from 'styled-components';

import image from './404.png';


export const NotFoundViewImage = styled.article`
  height: 350px;
  background: rgb(58, 122, 134);
  background: url(${image}) no-repeat center center;
  background-size: cover;
  padding: 25px;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
`;
