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

const SectionsScreen = () => {
  const theme = useTheme();

  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const renderColor = (color: string) => <ColorIndication color={color} />;

  const onContextMenuActionPress = (
    event: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>,
  ) => {
    switch (event.nativeEvent.name) {
      case ContextActionNames.ChangeColor:
        setShowColorPicker(true);
        break;

      case ContextActionNames.Delete:
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
          <ContextMenu
            actions={CONTEXT_ACTIONS}
            onPress={onContextMenuActionPress}>
            <Card
              style={{marginVertical: 4}}
              onPress={() => navigate('SectionDetailsScreen')}>
              <Card.Title
                title={'Section 1'}
                subtitle={'5 undone tasks left'}
                left={() => renderColor('red')}
              />
            </Card>
          </ContextMenu>
          <ContextMenu
            actions={CONTEXT_ACTIONS}
            onPress={onContextMenuActionPress}>
            <Card
              style={{marginVertical: 4}}
              onPress={() => navigate('SectionDetailsScreen')}>
              <Card.Title
                title={'Section 1'}
                subtitle={'5 undone tasks left'}
                left={() => renderColor('red')}
              />
            </Card>
          </ContextMenu>
          <ContextMenu
            actions={CONTEXT_ACTIONS}
            onPress={onContextMenuActionPress}>
            <Card
              style={{marginVertical: 4}}
              onPress={() => navigate('SectionDetailsScreen')}>
              <Card.Title
                title={'Section 1'}
                subtitle={'5 undone tasks left'}
                left={() => renderColor('red')}
              />
            </Card>
          </ContextMenu>
        </ScrollView>
        <AddTaskBtn screenToRedirect="AddSectionScreen" />
      </SafeAreaView>
      <Portal>
        <Modal
          visible={showColorPicker}
          onDismiss={() => setShowColorPicker(false)}
          contentContainerStyle={[
            {backgroundColor: theme.colors.background},
            styles.modal,
          ]}>
          <ColorPicker onColorChange={color => console.log(color)} />
        </Modal>
      </Portal>
    </>
  );
};

export default SectionsScreen;
