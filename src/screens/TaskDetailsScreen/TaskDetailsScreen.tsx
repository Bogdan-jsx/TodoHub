import React, {useCallback, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {
  Button,
  Checkbox,
  Divider,
  HelperText,
  List,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderBar} from 'src/components/HeaderBar';
import {sectionsSelector} from 'src/store/sections/selectors';
import {SectionType} from 'src/store/sections/types';
import {selectedTaskSelector} from 'src/store/tasks/selectors';
import {SubTaskType, TaskType} from 'src/types';
import {
  CheckboxWrapper,
  ColorIndicator,
  styles,
} from './TaskDetailsScreen.styled';
import {ChangeDateWrapper} from '../AddTaskScreen/AddTaskScreen.styled';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {DateTime} from 'luxon';
import {
  addSubtasksToTask,
  changeTaskDueDate,
  deleteSubtasks,
  markSubtaskAsDone,
  markSubtaskAsUndone,
} from 'src/store/tasks/actions';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {back} from 'src/navigation/navigation';

const TaskDetailsScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const task: TaskType = useSelector(selectedTaskSelector);
  const sections: SectionType[] = useSelector(sectionsSelector);
  const taskSection = sections.find(item => item.id === task.sectionId);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showDateError, setShowDateError] = useState<boolean>(false);

  const [newSubtasks, setNewSubtasks] = useState<{text: string}[]>([]);
  const [showSubtaskError, setShowSubtaskError] = useState<boolean>(false);

  const renderCheckbox = useCallback(
    (subtask: SubTaskType) => {
      return (
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
      );
    },
    [dispatch, task.id, theme.colors.primary],
  );

  const saveChanges = useCallback(() => {
    const filteredNewSubtasks = newSubtasks
      .filter(item => item.text)
      .map(item => ({
        title: item.text,
        id: uuidv4(),
        isDone: false,
      }));
    dispatch(addSubtasksToTask(task.id, filteredNewSubtasks));
    back();
  }, [dispatch, newSubtasks, task.id]);

  const renderDeleteSubtask = useCallback(
    (itemId: string) => (
      <View>
        <TextInput.Icon
          icon={'delete'}
          onPress={() => {
            if (task.subTasks.length <= 1) {
              return;
            }
            dispatch(deleteSubtasks(task.id, [itemId]));
          }}
        />
      </View>
    ),
    [dispatch, task.id, task.subTasks.length],
  );

  return (
    <>
      <HeaderBar title="Task details" shouldDisplayBackBtn={true} />
      <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
        <ScrollView>
          <View style={{padding: 8, gap: 8}}>
            <Text variant="headlineSmall">{task.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}>
              <ColorIndicator color={taskSection?.color || 'white'} />
              <Text variant="bodyLarge">{taskSection?.name}</Text>
            </View>
            <View>
              <ChangeDateWrapper>
                <Text variant="bodyLarge">
                  Due date:{' '}
                  {DateTime.fromJSDate(new Date(task.dueDate)).toFormat(
                    'dd.MM.yyyy',
                  )}
                </Text>
                <Button
                  onPress={() => {
                    setShowDateError(false);
                    setShowDatePicker(true);
                  }}>
                  Change
                </Button>
              </ChangeDateWrapper>
              <HelperText visible={showDateError} type="error" padding="none">
                Date must be in the future
              </HelperText>
            </View>
            <DateTimePickerModal
              date={new Date(task.dueDate)}
              isVisible={showDatePicker}
              mode="date"
              onCancel={() => setShowDatePicker(false)}
              onConfirm={newDate => {
                if (newDate >= new Date()) {
                  dispatch(changeTaskDueDate(task.id, newDate.toString()));
                  setShowDatePicker(false);
                } else {
                  setShowDateError(true);
                }
              }}
            />
            <View>
              <Text variant="bodyLarge">Subtasks: </Text>
              {task.subTasks.map(item => (
                <>
                  <Divider />
                  <List.Item
                    title={item.title}
                    {...(item.isDone && {
                      titleStyle: styles.done,
                    })}
                    left={() => renderCheckbox(item)}
                    right={() => renderDeleteSubtask(item.id)}
                  />
                </>
              ))}
              <View style={{gap: 8}}>
                {newSubtasks.map((item, index) => {
                  return (
                    <TextInput
                      key={index}
                      mode="outlined"
                      value={item.text}
                      onChangeText={newValue => {
                        setShowSubtaskError(false);
                        const subtasksDuplicate = [...newSubtasks];
                        subtasksDuplicate[index].text = newValue;
                        setNewSubtasks(subtasksDuplicate);
                      }}
                      right={
                        <TextInput.Icon
                          icon={'delete'}
                          onPress={() => {
                            if (
                              newSubtasks.length + task.subTasks.length <=
                              1
                            ) {
                              return;
                            }
                            const subtaskDuplicate = [...newSubtasks];
                            subtaskDuplicate.splice(index, 1);
                            setNewSubtasks(subtaskDuplicate);
                          }}
                        />
                      }
                    />
                  );
                })}
              </View>
              {showSubtaskError && (
                <HelperText
                  visible={showSubtaskError}
                  type="error"
                  padding="none">
                  At least one subtask should not be empty
                </HelperText>
              )}
              <View style={{flexDirection: 'row'}}>
                <Button
                  onPress={() => setNewSubtasks([...newSubtasks, {text: ''}])}>
                  + Add subtask
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
        {newSubtasks.some(item => item.text) && (
          <Button
            mode="contained-tonal"
            style={styles.addButton}
            onPress={() => {
              if (!newSubtasks.some(item => item.text)) {
                setShowSubtaskError(true);
                return;
              }
              saveChanges();
            }}>
            Save changes
          </Button>
        )}
      </SafeAreaView>
    </>
  );
};

export default TaskDetailsScreen;
