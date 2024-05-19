import React, {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Divider, List, Text, useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import AddTaskBtn from 'src/components/AddTaskBtn/AddTaskBtn';
import {HeaderBar} from 'src/components/HeaderBar';
import TaskItem from 'src/components/TaskItem';
import {tasksSelector} from 'src/store/tasks/selectors';
import {TaskType} from 'src/types';

const HomeScreen = () => {
  const theme = useTheme();
  const {t} = useTranslation();

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
          <View key={item.id}>
            <Divider />
            <TaskItem task={item} />
          </View>
        ))}
      </>
    );
  }, []);

  return (
    <>
      <HeaderBar title={t('screens.home.title')} shouldDisplayBackBtn={false} />
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
        }}>
        <ScrollView>
          {tasks.length < 1 && (
            <Text
              variant="bodyLarge"
              style={{textAlign: 'center', marginTop: 250}}>
              {t('screens.home.emptyState')}
            </Text>
          )}
          {taskGroups.overdue.length > 0 && (
            <List.Section title={t('screens.home.groups.overdue')}>
              {renderMapTasks(taskGroups.overdue)}
            </List.Section>
          )}
          {taskGroups.dueToday.length > 0 && (
            <List.Section title={t('screens.home.groups.dueToday')}>
              {renderMapTasks(taskGroups.dueToday)}
            </List.Section>
          )}
          {taskGroups.rest.length > 0 && (
            <>
              {isOnlyRest ? (
                renderMapTasks(taskGroups.rest)
              ) : (
                <List.Section
                  title={t('screens.home.groups.rest')}
                  style={{marginBottom: 90}}>
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
