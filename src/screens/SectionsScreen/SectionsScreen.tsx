import React, {useState} from 'react';
import {NativeSyntheticEvent, SafeAreaView, ScrollView} from 'react-native';
import {Card, Modal, Portal, Text, useTheme} from 'react-native-paper';
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
import {deleteTask} from 'src/store/tasks/actions';
import {useTranslation} from 'react-i18next';

const SectionsScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const sections = useSelector(sectionsSelector);
  const tasks = useSelector(tasksSelector);

  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [color, setColor] = useState<string>('');
  const [changeColorId, setChangeColorId] = useState<string>('');

  const [isLongPressed, setIsLongPressed] = useState<boolean>(false);

  const renderColor = (indicatorColor: string) => (
    <ColorIndication color={indicatorColor} />
  );

  const getContextMenuActionPress =
    (sectionId: string, sectionColor: string) =>
    (event: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>) => {
      setIsLongPressed(false);
      switch (event.nativeEvent.name) {
        case t(ContextActionNames.ChangeColor):
          setChangeColorId(sectionId);
          setColor(sectionColor);
          setShowColorPicker(true);
          break;

        case t(ContextActionNames.Delete):
          dispatch(deleteSection(sectionId));
          tasks.map(
            (item: TaskType) =>
              item.sectionId === sectionId && dispatch(deleteTask(item.id)),
          );
          break;

        default:
          break;
      }
    };

  return (
    <>
      <HeaderBar
        title={t('screens.sections.title')}
        shouldDisplayBackBtn={false}
      />
      <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
        <ScrollView style={{paddingHorizontal: 8}}>
          {sections.length === 0 && (
            <Text
              variant="bodyLarge"
              style={{textAlign: 'center', marginTop: 250}}>
              {t('screens.sections.emptyState')}
            </Text>
          )}
          {sections.map((item: SectionType) => {
            const undoneTasksCount =
              tasks?.filter(
                (taskItem: TaskType) =>
                  taskItem.sectionId === item.id &&
                  taskItem.subTasks.some(item => !item.isDone),
              ).length || 0;
            return (
              <ContextMenu
                actions={CONTEXT_ACTIONS.map(actions => ({
                  title: t(actions.title),
                }))}
                onPress={getContextMenuActionPress(item.id, item.color)}
                onCancel={() => setIsLongPressed(false)}
                key={item.id}>
                <Card
                  style={{marginVertical: 4}}
                  onLongPress={() => setIsLongPressed(true)}
                  onPressOut={() => setIsLongPressed(false)}
                  onPress={() => {
                    if (!isLongPressed) {
                      dispatch(setSelectedSections(item.id));
                      navigate('SectionDetailsScreen');
                    }
                  }}>
                  <Card.Title
                    title={item.name}
                    subtitle={t('sectionItem.undoneTasksCount', {
                      count: undoneTasksCount,
                    })}
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
