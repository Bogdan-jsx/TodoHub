import {Checkbox, Divider, List, useTheme} from 'react-native-paper';
import React, {useCallback, useMemo} from 'react';
import {navigate} from 'src/navigation/navigation';
import {NativeSyntheticEvent, View} from 'react-native';
import {ContextMenuOnPressNativeEvent} from 'react-native-context-menu-view';
import {ActionsNames, CONTEXT_MENU_ACTIONS, MOCK_TASK} from './config';
import {CheckboxWrapper, styles} from './TaskIten.styled';
import {DateTime} from 'luxon';

type TaskItemProps = {
  isLastItem?: boolean;
};

const TaskItem: React.FC<TaskItemProps> = ({isLastItem}) => {
  const theme = useTheme();
  const isTaskDone = useMemo(() => {
    return !MOCK_TASK.subTasks.some(item => !item.isDone);
  }, []);

  const {uncompletedTaskNumber, allTasksNumber} = useMemo(() => {
    const uncompletedTasks = MOCK_TASK.subTasks.filter(
      item => !item.isDone,
    ).length;
    const allTasks = MOCK_TASK.subTasks.length;

    return {uncompletedTaskNumber: uncompletedTasks, allTasksNumber: allTasks};
  }, []);

  const isDueTommorow =
    new Date().getDate() === new Date(MOCK_TASK.dueDate).getDate();

  const contextProps = {
    contextMenuActions: CONTEXT_MENU_ACTIONS,
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

  const renderCheckbox = useCallback(() => {
    return (
      <CheckboxWrapper color={theme.colors.primary}>
        <Checkbox
          status={'unchecked'}
          // onPress={() => setIsChecked(prev => !prev)}
        />
      </CheckboxWrapper>
    );
  }, [theme.colors.primary]);

  return (
    <List.Accordion
      {...contextProps}
      title={MOCK_TASK.title}
      {...(isTaskDone && {
        titleStyle: styles.done,
      })}
      {...(isLastItem && {
        style: {marginBottom: 90},
      })}
      description={`${uncompletedTaskNumber}/${allTasksNumber} subtasks left (Due ${
        isDueTommorow
          ? 'today'
          : DateTime.fromJSDate(new Date(MOCK_TASK.dueDate)).toFormat(
              'dd.MM.yyyy',
            )
      })`}>
      {MOCK_TASK.subTasks.map(item => (
        <View key={item.id}>
          <Divider />
          <List.Item
            title={item.title}
            style={styles.subTask}
            {...(item.isDone && {
              titleStyle: styles.done,
            })}
            left={renderCheckbox}
          />
        </View>
      ))}
    </List.Accordion>
  );
};

export default TaskItem;
