import React from 'react';
import {Button, Text, View} from 'react-native';
import {navigate} from 'src/navigation/navigation';

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="To Add task" onPress={() => navigate('AddTaskScreen')} />
      <Button
        title="To Task details"
        onPress={() => navigate('TaskDetailsScreen')}
      />
      <Button title="To Settings" onPress={() => navigate('SettingsScreen')} />
    </View>
  );
};

export default HomeScreen;
