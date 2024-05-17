import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import AddTaskBtn from 'src/components/AddTaskBtn/AddTaskBtn';
import {HeaderBar} from 'src/components/HeaderBar';

const HomeScreen = () => {
  return (
    <>
      <HeaderBar title="Task sections" shouldDisplayBackBtn={false} />
      <SafeAreaView style={{flex: 1}}>
        <Text>SectionsScreen</Text>
        <AddTaskBtn />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
