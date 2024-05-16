import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Divider, List, useTheme} from 'react-native-paper';
import {HeaderBar} from 'src/components/HeaderBar';
import TaskItem from 'src/components/TaskItem';

const HomeScreen = () => {
  const theme = useTheme();
  return (
    <>
      <HeaderBar title={'Home'} />
      <SafeAreaView style={{backgroundColor: theme.colors.background, flex: 1}}>
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
          <List.Section title="Rest">
            <Divider />
            <TaskItem />
            <Divider />
            <TaskItem />
            <Divider />
            <TaskItem />
            <Divider />
          </List.Section>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
