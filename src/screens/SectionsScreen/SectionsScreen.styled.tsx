import styled from 'styled-components/native';

export const ColorIndication = styled.View<{color: string}>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({color}) => color};
`;
