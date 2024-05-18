import {FAB} from 'react-native-paper';
import {navigate} from 'src/navigation/navigation';
import React from 'react';
import type {RootStackParamList} from 'src/navigation/types';

type AddTaskBtnProp = {
  screenToRedirect: keyof RootStackParamList;
};

const AddTaskBtn: React.FC<AddTaskBtnProp> = ({screenToRedirect}) => {
  return (
    <FAB
      icon="plus"
      style={{position: 'absolute', bottom: 16, right: 16}}
      onPress={() => navigate(screenToRedirect)}
    />
  );
};

export default AddTaskBtn;
