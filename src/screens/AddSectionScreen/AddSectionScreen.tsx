import React, {useCallback, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {
  Button,
  Modal,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import ColorPicker from 'react-native-wheel-color-picker';
import {HeaderBar} from 'src/components/HeaderBar';
import {
  ChangeColorWrapper,
  ColorIndicator,
  ColorIndicatorWrapper,
  styles,
} from './AddSectionScreen.styled';
import {useDispatch} from 'react-redux';
import {addSection} from 'src/store/sections/actions';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {back} from 'src/navigation/navigation';

const AddSectionScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [sectionName, setSectionName] = useState<string>('');
  const [showNameError, setShowNameError] = useState<boolean>(false);

  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#fcba03');

  const createSection = useCallback(() => {
    dispatch(addSection({name: sectionName, color, id: uuidv4()}));
    back();
  }, [color, dispatch, sectionName]);

  return (
    <>
      <HeaderBar title="Add section" shouldDisplayBackBtn={true} />
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
        }}>
        <View style={{padding: 8, gap: 8, flex: 1}}>
          <TextInput
            mode="outlined"
            value={sectionName}
            onChangeText={newValue => {
              setSectionName(newValue);
              setShowNameError(false);
            }}
            label="Section name"
            error={showNameError}
          />
          <ChangeColorWrapper>
            <ColorIndicatorWrapper>
              <ColorIndicator color={color} />
              <Text variant="bodyLarge">{color}</Text>
            </ColorIndicatorWrapper>
            <Button onPress={() => setShowColorPicker(true)}>
              Change color
            </Button>
          </ChangeColorWrapper>
          <Button
            mode="contained-tonal"
            style={styles.addButton}
            onPress={() => {
              if (!sectionName) {
                setShowNameError(true);
                return;
              }
              createSection();
            }}>
            Create task
          </Button>
        </View>
      </SafeAreaView>
      <Portal>
        <Modal
          visible={showColorPicker}
          onDismiss={() => setShowColorPicker(false)}
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

export default AddSectionScreen;
