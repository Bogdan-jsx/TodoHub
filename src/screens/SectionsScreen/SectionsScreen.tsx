import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Card} from 'react-native-paper';
import AddTaskBtn from 'src/components/AddTaskBtn/AddTaskBtn';
import {HeaderBar} from 'src/components/HeaderBar';
import {navigate} from 'src/navigation/navigation';

const HomeScreen = () => {
  return (
    <>
      <HeaderBar title="Task sections" shouldDisplayBackBtn={false} />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{paddingHorizontal: 8}}>
          <Card
            style={{marginVertical: 4}}
            onPress={() => navigate('SectionDetailsScreen')}>
            <Card.Title
              title={'Section 1'}
              subtitle={'5 undone tasks left'}
              left={() => (
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: 'red',
                  }}></View>
              )}
            />
          </Card>
          <Card
            style={{marginVertical: 4}}
            onPress={() => navigate('SectionDetailsScreen')}>
            <Card.Title
              title={'Section 1'}
              subtitle={'5 undone tasks left'}
              left={() => (
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: 'red',
                  }}></View>
              )}
            />
          </Card>
          <Card
            style={{marginVertical: 4}}
            onPress={() => navigate('SectionDetailsScreen')}>
            <Card.Title
              title={'Section 1'}
              subtitle={'5 undone tasks left'}
              left={() => (
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: 'red',
                  }}></View>
              )}
            />
          </Card>
        </ScrollView>
        <AddTaskBtn />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
