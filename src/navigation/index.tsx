import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddTaskScreen from 'src/screens/AddTaskScreen';
import TaskDetailsScreen from 'src/screens/TaskDetailsScreen';
import SettingsScreen from 'src/screens/SettingsScreen';
import TabsStack from './TabsStack';
import {navigationRef} from './navigation';
import SectionDetailsScreen from 'src/screens/SectionDetailsScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tabs" component={TabsStack} />
        <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
        <Stack.Screen name="TaskDetailsScreen" component={TaskDetailsScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen
          name="SectionDetailsScreen"
          component={SectionDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
