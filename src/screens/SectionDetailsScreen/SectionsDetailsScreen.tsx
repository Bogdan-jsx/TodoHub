import {SafeAreaView, ScrollView} from 'react-native';
import {HeaderBar} from 'src/components/HeaderBar';
import TaskItem from 'src/components/TaskItem';
import React, {useMemo} from 'react';
import {Button, Text, useTheme} from 'react-native-paper';
import {ColorIndicatior, styles} from './SectionsDetailsScreen.styled';
import {navigate} from 'src/navigation/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {tasksSelector} from 'src/store/tasks/selectors';
import {
  sectionsSelector,
  selectedSectionSelector,
} from 'src/store/sections/selectors';
import {TaskType} from 'src/types';
import {SectionType} from 'src/store/sections/types';
import {setIsFromSection} from 'src/store/tasks/actions';
import {useTranslation} from 'react-i18next';

const SectionsDetailsScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const allTasks = useSelector(tasksSelector);
  const allSections = useSelector(sectionsSelector);
  const selectedSectionId = useSelector(selectedSectionSelector);

  const sectionTasks = useMemo(() => {
    return allTasks.filter(
      (item: TaskType) => item.sectionId === selectedSectionId,
    );
  }, [allTasks, selectedSectionId]);
  const section = useMemo(() => {
    return allSections.find(
      (item: SectionType) => item.id === selectedSectionId,
    );
  }, [allSections, selectedSectionId]);

  return (
    <>
      <HeaderBar title={section.name} shouldDisplayBackBtn={true} />
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
        }}>
        <ScrollView>
          <ColorIndicatior color={section.color} />
          {sectionTasks.length < 1 && (
            <Text
              variant="bodyLarge"
              style={{textAlign: 'center', marginTop: 250}}>
              {t('screens.sectionDetails.emptyState')}
            </Text>
          )}
          {sectionTasks.map((item: TaskType) => (
            <TaskItem task={item} />
          ))}
        </ScrollView>
        <Button
          mode="contained-tonal"
          style={styles.addButton}
          onPress={() => {
            dispatch(setIsFromSection(true));
            navigate('AddTaskScreen');
          }}>
          {t('screens.sectionDetails.addTask')}
        </Button>
      </SafeAreaView>
    </>
  );
};

export default SectionsDetailsScreen;
