import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const ColorIndicator = styled.View<{color: string}>`
  width: 24px;
  height: 24px;
  background-color: ${({color}) => color};
  border-radius: 5px;
`;

export const ChangeColorWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ColorIndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const styles = StyleSheet.create({
  modal: {
    padding: 20,
    margin: 20,
    height: 400,
  },
  addButton: {
    position: 'absolute',
    marginHorizontal: 8,
    marginVertical: 16,
    bottom: 0,
    width: '100%',
  },
});
