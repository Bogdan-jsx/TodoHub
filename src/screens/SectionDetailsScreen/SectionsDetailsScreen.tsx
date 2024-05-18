import {SafeAreaView, ScrollView} from 'react-native';
import {HeaderBar} from 'src/components/HeaderBar';
import TaskItem from 'src/components/TaskItem';
import React from 'react';
import {Button, useTheme} from 'react-native-paper';
import {ColorIndicatior, styles} from './SectionsDetailsScreen.styled';
import {navigate} from 'src/navigation/navigation';

const SectionsDetailsScreen = () => {
  const theme = useTheme();
  return (
    <>
      <HeaderBar title="Section 1" shouldDisplayBackBtn={true} />
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
        }}>
        <ScrollView>
          <ColorIndicatior color="red" />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </ScrollView>
        <Button
          mode="contained-tonal"
          style={styles.addButton}
          onPress={() => navigate('AddTaskScreen')}>
          Add task to this section
        </Button>
      </SafeAreaView>
    </>
  );
};

export default SectionsDetailsScreen;
