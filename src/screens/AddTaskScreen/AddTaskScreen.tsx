import React, {useCallback, useMemo, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {
  sectionsSelector,
  selectedSectionSelector,
} from 'src/store/sections/selectors';
import {SectionType} from 'src/store/sections/types';
import {addTask, setIsFromSection} from 'src/store/tasks/actions';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {back} from 'src/navigation/navigation';
import {isFromSectionSelector} from 'src/store/tasks/selectors';
import {useTranslation} from 'react-i18next';

const HomeScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const isFromSection = useSelector(isFromSectionSelector);
  const selectedSectionId = useSelector(selectedSectionSelector);

  const [showSectionDropdown, setShowSectionDropdown] =
    useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const sections = useSelector(sectionsSelector);

  const [selectedSection, setSelectedSection] = useState<string>(
    isFromSection ? selectedSectionId : sections[0].id,
  );

  const sectionsList = useMemo(() => {
    return sections.map((item: SectionType) => ({
      label: item.name,
      value: item.id,
      custom: (
        <SectionDropdownItem
          text={item.name}
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
  const [showSubtaskError, setShowSubtaskError] = useState<boolean>(false);

  const [taskText, setTaskText] = useState<string>('');
  const [showTaskTextError, setShowTaskTextError] = useState<boolean>(false);

  const createTask = useCallback(() => {
    const subTasks = subtasks
      .filter(item => item.text)
      .map(item => ({
        title: item.text,
        id: uuidv4(),
        isDone: false,
      }));
    dispatch(
      addTask({
        id: uuidv4(),
        title: taskText,
        sectionId: selectedSection,
        dueDate: date.toString(),
        subTasks,
      }),
    );
    back();
    dispatch(setIsFromSection(false));
  }, [date, dispatch, selectedSection, subtasks, taskText]);

  return (
    <>
      <HeaderBar
        title={t('screens.addTask.title')}
        shouldDisplayBackBtn={true}
      />
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
        }}>
        <ScrollView>
          <View style={{padding: 8, gap: 8}}>
            <TextInput
              label={t('screens.addTask.taskText.placeholder')}
              mode="outlined"
              value={taskText}
              onChangeText={newValue => {
                setShowTaskTextError(false);
                setTaskText(newValue);
              }}
              error={showTaskTextError}
              maxLength={100}
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
                  {t('screens.addTask.dueDate', {
                    date: DateTime.fromJSDate(date).toFormat('dd.MM.yyyy'),
                  })}
                </Text>
                <Button
                  onPress={() => {
                    setShowDateError(false);
                    setShowDatePicker(true);
                  }}>
                  {t('screens.addTask.change')}
                </Button>
              </ChangeDateWrapper>
              <HelperText visible={showDateError} type="error" padding="none">
                {t('screens.addTask.dateError')}
              </HelperText>
            </View>
            <DateTimePickerModal
              date={date}
              isVisible={showDatePicker}
              mode="date"
              onCancel={() => setShowDatePicker(false)}
              onConfirm={newDate => {
                if (newDate >= new Date()) {
                  setDate(newDate);
                } else {
                  setShowDateError(true);
                }
                setShowDatePicker(false);
              }}
            />
            <Text variant="bodyLarge">{t('screens.addTask.subtasks')}</Text>
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
                  maxLength={100}
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
                {t('screens.addTask.subtasks.error')}
              </HelperText>
            )}
            <View style={{flexDirection: 'row'}}>
              <Button onPress={() => setSubtasks([...subtasks, {text: ''}])}>
                {t('screens.addTask.addSubtask')}
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
            if (!subtasks.some(item => item.text)) {
              setShowSubtaskError(true);
              return;
            }
            createTask();
          }}>
          {t('screens.addTask.createBtn')}
        </Button>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
