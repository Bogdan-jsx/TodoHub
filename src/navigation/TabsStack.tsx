import HomeScreen from 'src/screens/HomeScreen';
import SectionsScreen from 'src/screens/SectionsScreen';
import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {TabBar} from './TabBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

const TabsStack = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: t('tabs.home.title'),
          tabBarIcon: ({color, size}) => {
            return <MaterialIcons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="SectionsScreen"
        component={SectionsScreen}
        options={{
          tabBarLabel: t('tabs.sections.title'),
          tabBarIcon: ({color, size}) => {
            return <MaterialIcons name="list" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsStack;
