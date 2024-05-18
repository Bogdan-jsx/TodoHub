import React, {useCallback, useMemo} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Divider, List, useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import AddTaskBtn from 'src/components/AddTaskBtn/AddTaskBtn';
import {HeaderBar} from 'src/components/HeaderBar';
import TaskItem from 'src/components/TaskItem';
import {tasksSelector} from 'src/store/tasks/selectors';
import {TaskType} from 'src/types';

const HomeScreen = () => {
  const theme = useTheme();

  const tasks = useSelector(tasksSelector);
  const taskGroups = useMemo(() => {
    const overdue: TaskType[] = [];
    const dueToday: TaskType[] = [];
    const rest: TaskType[] = [];
    tasks.map((item: TaskType) => {
      if (new Date(new Date().toDateString()) > new Date(item.dueDate)) {
        overdue.push(item);
        return;
      }
      if (new Date().toDateString() === new Date(item.dueDate).toDateString()) {
        dueToday.push(item);
        return;
      }
      rest.push(item);
    });
    return {overdue, dueToday, rest};
  }, [tasks]);

  const isOnlyRest = useMemo(() => {
    if (taskGroups.overdue.length > 0) return false;
    if (taskGroups.dueToday.length > 0) return false;
    return true;
  }, [taskGroups.dueToday.length, taskGroups.overdue.length]);

  const renderMapTasks = useCallback((tasksToRender: TaskType[]) => {
    return (
      <>
        {tasksToRender.map(item => (
          <>
            <Divider />
            <TaskItem task={item} />
          </>
        ))}
      </>
    );
  }, []);

  return (
    <>
      <HeaderBar title={'Home'} shouldDisplayBackBtn={false} />
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
        }}>
        <ScrollView>
          {taskGroups.overdue.length > 0 && (
            <List.Section title="Overdue">
              {renderMapTasks(taskGroups.overdue)}
            </List.Section>
          )}
          {taskGroups.dueToday.length > 0 && (
            <List.Section title="Due today">
              {renderMapTasks(taskGroups.dueToday)}
            </List.Section>
          )}
          {taskGroups.rest.length > 0 && (
            <>
              {isOnlyRest ? (
                renderMapTasks(taskGroups.rest)
              ) : (
                <List.Section title="Rest" style={{marginBottom: 90}}>
                  {renderMapTasks(taskGroups.rest)}
                </List.Section>
              )}
            </>
          )}
        </ScrollView>
        <AddTaskBtn screenToRedirect="AddTaskScreen" />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
