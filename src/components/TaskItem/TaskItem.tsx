import {Checkbox, Divider, List, useTheme} from 'react-native-paper';
import React, {useCallback, useMemo} from 'react';
import {navigate} from 'src/navigation/navigation';
import {NativeSyntheticEvent, View} from 'react-native';
import {ContextMenuOnPressNativeEvent} from 'react-native-context-menu-view';
import {ActionsNames, CONTEXT_MENU_ACTIONS} from './config';
import {CheckboxWrapper, ColorIndicator, styles} from './TaskIten.styled';
import {DateTime} from 'luxon';
import {TaskType} from 'src/types';
import {useDispatch, useSelector} from 'react-redux';
import {sectionsSelector} from 'src/store/sections/selectors';
import {SectionType} from 'src/store/sections/types';
import {markTaskAsRead} from 'src/store/tasks/actions';

type TaskItemProps = {
  task: TaskType;
};

const TaskItem: React.FC<TaskItemProps> = ({task}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const sections = useSelector(sectionsSelector);
  const color = sections.find(
    (item: SectionType) => item.id === task.sectionId,
  ).color;

  const isTaskDone = useMemo(() => {
    return !task.subTasks.some(item => !item.isDone);
  }, [task.subTasks]);

  const {uncompletedTaskNumber, allTasksNumber} = useMemo(() => {
    const uncompletedTasks = task.subTasks.filter(item => !item.isDone).length;
    const allTasks = task.subTasks.length;

    return {uncompletedTaskNumber: uncompletedTasks, allTasksNumber: allTasks};
  }, [task.subTasks]);

  const isDueTommorow =
    new Date().getDate() === new Date(task.dueDate).getDate();

  const contextProps = {
    contextMenuActions: CONTEXT_MENU_ACTIONS,
    onContextMenuActionPress: (
      event: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>,
    ) => {
      switch (event.nativeEvent.name) {
        case ActionsNames.Details:
          navigate('TaskDetailsScreen');
          break;

        case ActionsNames.MarkAsDone:
          dispatch(markTaskAsRead(task.id));
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

  const renderColor = useCallback(
    () => (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ColorIndicator color={color} />
      </View>
    ),
    [color],
  );

  return (
    <List.Accordion
      {...contextProps}
      title={task.title}
      {...(isTaskDone && {
        titleStyle: styles.done,
      })}
      left={renderColor}
      description={`${uncompletedTaskNumber}/${allTasksNumber} subtasks left (Due ${
        isDueTommorow
          ? 'today'
          : DateTime.fromJSDate(new Date(task.dueDate)).toFormat('dd.MM.yyyy')
      })`}>
      {task.subTasks.map(item => (
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
