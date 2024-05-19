import {Checkbox, Divider, List, useTheme} from 'react-native-paper';
import React, {useCallback, useMemo, useState} from 'react';
import {navigate} from 'src/navigation/navigation';
import {NativeSyntheticEvent, Platform, View} from 'react-native';
import {ContextMenuOnPressNativeEvent} from 'react-native-context-menu-view';
import {ActionsNames, CONTEXT_MENU_ACTIONS} from './config';
import {CheckboxWrapper, ColorIndicator, styles} from './TaskIten.styled';
import {DateTime} from 'luxon';
import {SubTaskType, TaskType} from 'src/types';
import {useDispatch, useSelector} from 'react-redux';
import {sectionsSelector} from 'src/store/sections/selectors';
import {SectionType} from 'src/store/sections/types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  changeTaskDueDate,
  deleteTask,
  markSubtaskAsDone,
  markSubtaskAsUndone,
  markTaskAsRead,
  setSelectedTask,
} from 'src/store/tasks/actions';
import {useTranslation} from 'react-i18next';

type TaskItemProps = {
  task: TaskType;
};

const TaskItem: React.FC<TaskItemProps> = ({task}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

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
    contextMenuActions: CONTEXT_MENU_ACTIONS.map(item => ({
      title: t(item.title),
    })),
    onContextMenuActionPress: (
      event: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>,
    ) => {
      switch (event.nativeEvent.name) {
        case t(ActionsNames.Details):
          dispatch(setSelectedTask(task.id));
          navigate('TaskDetailsScreen');
          break;

        case t(ActionsNames.MarkAsDone):
          dispatch(markTaskAsRead(task.id));
          break;

        case t(ActionsNames.ChangeDate):
          setShowDatePicker(true);
          break;

        case t(ActionsNames.Delete):
          dispatch(deleteTask(task.id));
          break;

        default:
          break;
      }
    },
    onCancel: () => setDisableOpen(false),
  };

  const renderCheckbox = useCallback(
    (subtask: SubTaskType) => {
      return Platform.OS === 'ios' ? (
        <CheckboxWrapper color={theme.colors.primary}>
          <Checkbox
            status={subtask.isDone ? 'checked' : 'unchecked'}
            onPress={() =>
              dispatch(
                subtask.isDone
                  ? markSubtaskAsUndone(task.id, subtask.id)
                  : markSubtaskAsDone(task.id, subtask.id),
              )
            }
          />
        </CheckboxWrapper>
      ) : (
        <Checkbox
          status={subtask.isDone ? 'checked' : 'unchecked'}
          onPress={() =>
            dispatch(
              subtask.isDone
                ? markSubtaskAsUndone(task.id, subtask.id)
                : markSubtaskAsDone(task.id, subtask.id),
            )
          }
        />
      );
    },
    [dispatch, task.id, theme.colors.primary],
  );

  const renderColor = useCallback(
    () => (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ColorIndicator color={color} />
      </View>
    ),
    [color],
  );

  const [disableOpen, setDisableOpen] = useState<boolean>(false);

  return (
    <>
      <List.Accordion
        {...contextProps}
        title={task.title}
        {...(isTaskDone && {
          titleStyle: styles.done,
        })}
        left={renderColor}
        onLongPress={() => setDisableOpen(true)}
        {...(disableOpen && {
          onPress: () => null,
        })}
        description={`${t('taskItem.subTasksLeft.text', {
          left: uncompletedTaskNumber,
          all: allTasksNumber,
        })} ${
          isDueTommorow
            ? t('taskItem.dueDate.dueToday.text')
            : t('taskItem.dueDate.text', {
                date: DateTime.fromJSDate(new Date(task.dueDate)).toFormat(
                  'dd.MM.yyyy',
                ),
              })
        }`}>
        {task.subTasks.map(item => (
          <View key={item.id}>
            <Divider />
            <List.Item
              title={item.title}
              style={styles.subTask}
              {...(item.isDone && {
                titleStyle: styles.done,
              })}
              left={() => renderCheckbox(item)}
            />
          </View>
        ))}
      </List.Accordion>
      <DateTimePickerModal
        date={new Date(task.dueDate)}
        isVisible={showDatePicker}
        mode="date"
        onCancel={() => setShowDatePicker(false)}
        onConfirm={newDate => {
          if (newDate <= new Date()) {
            return;
          }
          dispatch(changeTaskDueDate(task.id, newDate.toString()));
          setShowDatePicker(false);
        }}
      />
    </>
  );
};

export default TaskItem;
