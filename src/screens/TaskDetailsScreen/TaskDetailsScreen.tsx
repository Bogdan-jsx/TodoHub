import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {HeaderBar} from 'src/components/HeaderBar';

const HomeScreen = () => {
  return (
    <>
      <HeaderBar title="Task details" shouldDisplayBackBtn={true} />
      <SafeAreaView style={{flex: 1}}>
        <Text>TaskDetailsScreen</Text>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
