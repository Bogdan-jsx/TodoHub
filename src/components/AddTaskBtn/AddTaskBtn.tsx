import {FAB} from 'react-native-paper';
import {navigate} from 'src/navigation/navigation';
import React from 'react';

const AddTaskBtn = () => {
  return (
    <FAB
      icon="plus"
      style={{position: 'absolute', bottom: 16, right: 16}}
      onPress={() => navigate('AddTaskScreen')}
    />
  );
};

export default AddTaskBtn;
