import React, {useState} from 'react';
import {NativeSyntheticEvent, SafeAreaView, ScrollView} from 'react-native';
import {Card, Modal, Portal, useTheme} from 'react-native-paper';
import AddTaskBtn from 'src/components/AddTaskBtn/AddTaskBtn';
import {HeaderBar} from 'src/components/HeaderBar';
import {navigate} from 'src/navigation/navigation';
import {ColorIndication, styles} from './SectionsScreen.styled';
import ContextMenu, {
  ContextMenuOnPressNativeEvent,
} from 'react-native-context-menu-view';
import {CONTEXT_ACTIONS} from './config';
import {ContextActionNames} from './types';
import ColorPicker from 'react-native-wheel-color-picker';
import {useDispatch, useSelector} from 'react-redux';
import {sectionsSelector} from 'src/store/sections/selectors';
import {SectionType} from 'src/store/sections/types';
import {tasksSelector} from 'src/store/tasks/selectors';
import {TaskType} from 'src/types';
import {
  changeSectionColor,
  deleteSection,
  setSelectedSections,
} from 'src/store/sections/actions';

const SectionsScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const sections = useSelector(sectionsSelector);
  const tasks = useSelector(tasksSelector);

  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [color, setColor] = useState<string>('');
  const [changeColorId, setChangeColorId] = useState<string>('');

  const renderColor = (indicatorColor: string) => (
    <ColorIndication color={indicatorColor} />
  );

  const getContextMenuActionPress =
    (sectionId: string, sectionColor: string) =>
    (event: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>) => {
      switch (event.nativeEvent.name) {
        case ContextActionNames.ChangeColor:
          setChangeColorId(sectionId);
          setColor(sectionColor);
          setShowColorPicker(true);
          break;

        case ContextActionNames.Delete:
          dispatch(deleteSection(sectionId));
          break;

        default:
          break;
      }
    };

  return (
    <>
      <HeaderBar title="Task sections" shouldDisplayBackBtn={false} />
      <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
        <ScrollView style={{paddingHorizontal: 8}}>
          {sections.map((item: SectionType) => {
            const undoneTasksCount = tasks.filter(
              (taskItem: TaskType) =>
                taskItem.sectionId === item.id &&
                taskItem.subTasks.some(item => !item.isDone),
            ).length;
            return (
              <ContextMenu
                actions={CONTEXT_ACTIONS}
                onPress={getContextMenuActionPress(item.id, item.color)}
                key={item.id}>
                <Card
                  style={{marginVertical: 4}}
                  onPress={() => {
                    dispatch(setSelectedSections(item.id));
                    navigate('SectionDetailsScreen');
                  }}>
                  <Card.Title
                    title={item.name}
                    subtitle={`${undoneTasksCount} undone tasks left`}
                    left={() => renderColor(item.color)}
                  />
                </Card>
              </ContextMenu>
            );
          })}
        </ScrollView>
        <AddTaskBtn screenToRedirect="AddSectionScreen" />
      </SafeAreaView>
      <Portal>
        <Modal
          visible={showColorPicker}
          onDismiss={() => {
            dispatch(changeSectionColor(changeColorId, color));
            setShowColorPicker(false);
          }}
          contentContainerStyle={[
            {backgroundColor: theme.colors.background},
            styles.modal,
          ]}>
          <ColorPicker onColorChange={setColor} color={color} />
        </Modal>
      </Portal>
    </>
  );
};

export default SectionsScreen;
