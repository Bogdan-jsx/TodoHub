import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Divider, List, useTheme} from 'react-native-paper';
import AddTaskBtn from 'src/components/AddTaskBtn/AddTaskBtn';
import {HeaderBar} from 'src/components/HeaderBar';
import TaskItem from 'src/components/TaskItem';

const HomeScreen = () => {
  const theme = useTheme();
  return (
    <>
      <HeaderBar title={'Home'} shouldDisplayBackBtn={false} />
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
        }}>
        <ScrollView>
          <List.Section title="Overdue">
            <Divider />
            <TaskItem />
            <Divider />
            <TaskItem />
            <Divider />
            <TaskItem />
            <Divider />
          </List.Section>
          <List.Section title="Due today">
            <Divider />
            <TaskItem />
            <Divider />
            <TaskItem />
            <Divider />
            <TaskItem />
            <Divider />
          </List.Section>
          <List.Section title="Rest" style={{marginBottom: 90}}>
            <Divider />
            <TaskItem />
            <Divider />
            <TaskItem />
            <Divider />
            <TaskItem />
            <Divider />
          </List.Section>
        </ScrollView>
        <AddTaskBtn />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
