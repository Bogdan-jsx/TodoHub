import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const CheckboxWrapper = styled.View<{color: string}>`
  border-radius: 5px;
  border: 1px solid ${({color}) => color};
`;

export const styles = StyleSheet.create({
  done: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'line-through',
  },
  subTask: {
    paddingLeft: 24,
  },
});
