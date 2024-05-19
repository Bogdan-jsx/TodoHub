import {combineReducers} from 'redux';
import sectionsReducer from './sections/reducer';
import tasksReducer from './tasks/reducer';
import settingsReducer from './settings/reducer';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default combineReducers({
  sections: persistReducer(
    {key: 'sections', storage: AsyncStorage},
    sectionsReducer,
  ),
  tasks: persistReducer({key: 'tasks', storage: AsyncStorage}, tasksReducer),
  settings: persistReducer(
    {key: 'settings', storage: AsyncStorage},
    settingsReducer,
  ),
});
