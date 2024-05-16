import {Appbar, useTheme} from 'react-native-paper';
import React from 'react';
import {back} from 'src/navigation/navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

type HeaderBarProps = {
  title: string;
};

const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  const theme = useTheme()
  return (
    <Appbar.Header style={{backgroundColor: theme.colors.elevation.level2}}>
      <Appbar.BackAction onPress={back} />
      <Appbar.Content title={title} />
      <Appbar.Action
        icon={({color}) => (
          <MaterialIcon name="settings" size={24} color={color} />
        )}
        onPress={() => {}}
      />
    </Appbar.Header>
  );
};

export default HeaderBar;
