import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from 'src/screens/HomeScreen';
import SectionsScreen from 'src/screens/SectionsScreen';

const Tab = createBottomTabNavigator();

const TabsStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="SectionsScreen" component={SectionsScreen} />
    </Tab.Navigator>
  );
};

export default TabsStack;
