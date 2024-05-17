import React from 'react';
import {Text, View} from 'react-native';
import {HeaderBar} from 'src/components/HeaderBar';

const HomeScreen = () => {
  return (
    <View>
      <HeaderBar title="Add new task" shouldDisplayBackBtn={true} />
      <Text>AddTaskScreen</Text>
    </View>
  );
};

export default HomeScreen;
