import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const ColorIndication = styled.View<{color: string}>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({color}) => color};
`;

export const styles = StyleSheet.create({
  modal: {
    padding: 20,
    margin: 20,
    height: 400,
  },
});
