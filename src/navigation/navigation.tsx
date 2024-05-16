import {
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {RootStackParamList} from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

type ScreenNamesType = keyof RootStackParamList;

export const navigate = (name: ScreenNamesType, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params);
  }
};

export const replace = (name: ScreenNamesType, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
};

export const back = () => {
  navigationRef.current?.dispatch(CommonActions.goBack());
};
