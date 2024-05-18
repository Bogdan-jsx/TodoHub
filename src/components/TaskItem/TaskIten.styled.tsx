import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const CheckboxWrapper = styled.View<{color: string}>`
  border-radius: 5px;
  border: 1px solid ${({color}) => color};
`;

export const ColorIndicator = styled.View<{color: string}>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({color}) => color};
  margin-left: 8px;
`;

export const styles = StyleSheet.create({
  done: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'line-through',
  },
  subTask: {
    paddingLeft: 12,
  },
});
