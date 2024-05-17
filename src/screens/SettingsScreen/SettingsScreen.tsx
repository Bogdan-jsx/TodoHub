import React from 'react';
import {Text, View} from 'react-native';
import {HeaderBar} from 'src/components/HeaderBar';

const HomeScreen = () => {
  return (
    <>
      <HeaderBar title="Settings" shouldDisplayBackBtn={true} />
      <View>
        <Text>SettingsScreen</Text>
      </View>
    </>
  );
};

export default HomeScreen;
