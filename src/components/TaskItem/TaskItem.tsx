import {Divider, List} from 'react-native-paper';
import React from 'react';
import {navigate} from 'src/navigation/navigation';
import {NativeSyntheticEvent} from 'react-native';
import {ContextMenuOnPressNativeEvent} from 'react-native-context-menu-view';

enum ActionsNames {
  Details = 'See details',
  ChangeDate = 'Change due date',
  Delete = 'Delete',
}

const TaskItem = () => {
  const contextMenuActions = [
    {title: ActionsNames.Details},
    {title: ActionsNames.ChangeDate},
    {title: ActionsNames.Delete},
  ];
  const contextProps = {
    contextMenuActions,
    onContextMenuActionPress: (
      event: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>,
    ) => {
      switch (event.nativeEvent.name) {
        case ActionsNames.Details:
          navigate('TaskDetailsScreen');
          break;

        case ActionsNames.ChangeDate:
          break;

        case ActionsNames.Delete:
          break;
        default:
          break;
      }
    },
  };
  return (
    <List.Accordion
      {...contextProps}
      title={'Some task 1'}
      titleStyle={{
        textDecorationStyle: 'solid',
        textDecorationLine: 'line-through',
      }}
      description={'2/7 subtasks left (Due tomorrow)'}>
      <Divider />
      <List.Item title={'Some subtask 1'} style={{paddingLeft: 12}} />
    </List.Accordion>
  );
};

export default TaskItem;
