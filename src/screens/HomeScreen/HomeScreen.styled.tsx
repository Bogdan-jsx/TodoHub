import {MD3Theme} from 'react-native-paper';
import styled from 'styled-components/native';

export const CustomText = styled.Text<{theme: MD3Theme}>`
  color: ${({theme}) => theme.colors.primary};
`;
