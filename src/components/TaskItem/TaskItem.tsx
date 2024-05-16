import {Divider, List} from 'react-native-paper';
import React from 'react';

const TaskItem = () => {
  return (
    <List.Accordion
      title={'Some task 1'}
      description={'2/7 subtasks left (Due tomorrow)'}>
      <Divider />
      <List.Item title={'Some subtask 1'} style={{paddingLeft: 12}} />
    </List.Accordion>
  );
};

export default TaskItem;
