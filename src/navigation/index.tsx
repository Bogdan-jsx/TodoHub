import {NavigationContainer} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddTaskScreen from 'src/screens/AddTaskScreen';
import TaskDetailsScreen from 'src/screens/TaskDetailsScreen';
import SettingsScreen from 'src/screens/SettingsScreen';
import TabsStack from './TabsStack';
import {navigationRef} from './navigation';
import SectionDetailsScreen from 'src/screens/SectionDetailsScreen';
import AddSectionScreen from 'src/screens/AddSectionScreen';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {ThemeType} from 'src/store/settings/types';
import {settingsSelector} from 'src/store/settings/selectors';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const settings = useSelector(settingsSelector);

  const theme = useMemo(() => {
    if (settings.theme === ThemeType.Dark) return MD3DarkTheme;
    if (settings.theme === ThemeType.Light) return MD3LightTheme;
    return undefined;
  }, [settings.theme]);

  return (
    <PaperProvider {...(theme ? {theme} : {})}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Tabs" component={TabsStack} />
          <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
          <Stack.Screen
            name="TaskDetailsScreen"
            component={TaskDetailsScreen}
          />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen
            name="SectionDetailsScreen"
            component={SectionDetailsScreen}
          />
          <Stack.Screen name="AddSectionScreen" component={AddSectionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Navigation;
