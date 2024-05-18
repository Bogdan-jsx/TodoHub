import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Card, useTheme} from 'react-native-paper';
import AddTaskBtn from 'src/components/AddTaskBtn/AddTaskBtn';
import {HeaderBar} from 'src/components/HeaderBar';
import {navigate} from 'src/navigation/navigation';
import {ColorIndication} from './SectionsScreen.styled';

const SectionsScreen = () => {
  const theme = useTheme();

  const renderColor = (color: string) => <ColorIndication color={color} />;

  return (
    <>
      <HeaderBar title="Task sections" shouldDisplayBackBtn={false} />
      <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
        <ScrollView style={{paddingHorizontal: 8}}>
          <Card
            style={{marginVertical: 4}}
            onPress={() => navigate('SectionDetailsScreen')}>
            <Card.Title
              title={'Section 1'}
              subtitle={'5 undone tasks left'}
              left={() => renderColor('red')}
            />
          </Card>
          <Card
            style={{marginVertical: 4}}
            onPress={() => navigate('SectionDetailsScreen')}>
            <Card.Title
              title={'Section 1'}
              subtitle={'5 undone tasks left'}
              left={() => renderColor('red')}
            />
          </Card>
          <Card
            style={{marginVertical: 4}}
            onPress={() => navigate('SectionDetailsScreen')}>
            <Card.Title
              title={'Section 1'}
              subtitle={'5 undone tasks left'}
              left={() => renderColor('red')}
            />
          </Card>
        </ScrollView>
        <AddTaskBtn screenToRedirect="AddSectionScreen" />
      </SafeAreaView>
    </>
  );
};

export default SectionsScreen;
