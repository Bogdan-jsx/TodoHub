import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const ColorIndicatior = styled.View<{color: string}>`
  width: 100%;
  height: 8px;
  background-color: ${({color}) => color};
`;

export const styles = StyleSheet.create({
  addButton: {
    marginHorizontal: 8,
    marginVertical: 16,
  },
});
