import styled from 'styled-components/native';

export const ColorIndicator = styled.View<{color: string}>`
  width: 16px;
  height: 16px;
  background-color: ${({color}) => color};
  border-radius: 5px;
  margin-right: 8px;
`;
