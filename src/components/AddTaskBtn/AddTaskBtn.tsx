import {FAB} from 'react-native-paper';
import {navigate} from 'src/navigation/navigation';
import React from 'react';
import type {RootStackParamList} from 'src/navigation/types';
import {useSelector} from 'react-redux';
import {sectionsSelector} from 'src/store/sections/selectors';

type AddTaskBtnProp = {
  screenToRedirect: keyof RootStackParamList;
};

const AddTaskBtn: React.FC<AddTaskBtnProp> = ({screenToRedirect}) => {
  const sections = useSelector(sectionsSelector);
  return (
    <FAB
      icon="plus"
      style={{position: 'absolute', bottom: 16, right: 16}}
      onPress={() =>
        navigate(sections.length < 1 ? 'AddSectionScreen' : screenToRedirect)
      }
    />
  );
};

export default AddTaskBtn;
