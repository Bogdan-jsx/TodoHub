import React, {useMemo, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {HeaderBar} from 'src/components/HeaderBar';
import SectionDropdownItem from 'src/components/SectionDropdownItem/SectionDropdownItem';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {DateTime} from 'luxon';
import {ChangeDateWrapper, styles} from './AddTaskScreen.styled';

const HomeScreen = () => {
  const theme = useTheme();

  const [showSectionDropdown, setShowSectionDropdown] =
    useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const sections = useMemo(
    () => [
      {title: 'Section 1', color: 'red', id: 'id1'},
      {title: 'Section 2', color: 'green', id: 'id2'},
      {title: 'Section 3', color: 'blue', id: 'id3'},
      {title: 'Section 4', color: 'yellow', id: 'id4'},
    ],
    [],
  );

  const [selectedSection, setSelectedSection] = useState<string>(
    sections[0].id,
  );

  const sectionsList = useMemo(() => {
    return sections.map(item => ({
      label: item.title,
      value: item.id,
      custom: (
        <SectionDropdownItem
          text={item.title}
          color={item.color}
          isSelected={selectedSection === item.id}
        />
      ),
    }));
  }, [sections, selectedSection]);

  const [date, setDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() + 1)),
  );
  const [showDateError, setShowDateError] = useState<boolean>(false);

  const [subtasks, setSubtasks] = useState<{text: string}[]>([{text: ''}]);

  const [taskText, setTaskText] = useState<string>('');
  const [showTaskTextError, setShowTaskTextError] = useState<boolean>(false);

  const [showSubtaskError, setShowSubtaskError] = useState<boolean>(false);

  return (
    <>
      <HeaderBar title="Add new task" shouldDisplayBackBtn={true} />
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
        }}>
        <ScrollView>
          <View style={{padding: 8, gap: 8}}>
            <TextInput
              label={'Task text'}
              mode="outlined"
              value={taskText}
              onChangeText={newValue => {
                setShowTaskTextError(false);
                setTaskText(newValue);
              }}
              error={showTaskTextError}
            />
            <DropDown
              visible={showSectionDropdown}
              onDismiss={() => setShowSectionDropdown(false)}
              showDropDown={() => setShowSectionDropdown(true)}
              list={sectionsList}
              value={selectedSection}
              setValue={value => setSelectedSection(value)}
              mode="outlined"
            />
            <View>
              <ChangeDateWrapper>
                <Text variant="bodyLarge">
                  Due date: {DateTime.fromJSDate(date).toFormat('dd.MM.yyyy')}
                </Text>
                <Button
                  onPress={() => {
                    setShowDateError(false);
                    setShowDatePicker(true);
                  }}>
                  Change
                </Button>
              </ChangeDateWrapper>
              <HelperText visible={showDateError} type="error" padding="none">
                Date must be in the future
              </HelperText>
            </View>
            <DateTimePickerModal
              isVisible={showDatePicker}
              mode="date"
              onCancel={() => setShowDatePicker(false)}
              onConfirm={newDate => {
                if (newDate > new Date()) {
                  setDate(newDate);
                } else {
                  setShowDateError(true);
                }
                setShowDatePicker(false);
              }}
            />
            <Text variant="bodyLarge">Subtasks:</Text>
            {subtasks.map((item, index) => {
              return (
                <TextInput
                  key={index}
                  mode="outlined"
                  value={item.text}
                  onChangeText={newValue => {
                    setShowSubtaskError(false);
                    const subtasksDuplicate = [...subtasks];
                    subtasksDuplicate[index].text = newValue;
                    setSubtasks(subtasksDuplicate);
                  }}
                  right={
                    <TextInput.Icon
                      icon={'delete'}
                      onPress={() => {
                        if (subtasks.length <= 1) {
                          return;
                        }
                        const subtaskDuplicate = [...subtasks];
                        subtaskDuplicate.splice(index, 1);
                        setSubtasks(subtaskDuplicate);
                      }}
                    />
                  }
                />
              );
            })}
            {showSubtaskError && (
              <HelperText
                visible={showSubtaskError}
                type="error"
                padding="none">
                At least one subtask should not be empty
              </HelperText>
            )}
            <View style={{flexDirection: 'row'}}>
              <Button onPress={() => setSubtasks([...subtasks, {text: ''}])}>
                + Add subtask
              </Button>
            </View>
          </View>
        </ScrollView>
        <Button
          mode="contained-tonal"
          style={styles.addButton}
          onPress={() => {
            if (!taskText) {
              setShowTaskTextError(true);
              return;
            }
            if (!subtasks[0].text) {
              setShowSubtaskError(true);
              return;
            }
            console.log('Create task');
          }}>
          Create task
        </Button>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
