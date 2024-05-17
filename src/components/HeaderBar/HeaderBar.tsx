import {Appbar, useTheme} from 'react-native-paper';
import React from 'react';
import {back, navigate} from 'src/navigation/navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

type HeaderBarProps = {
  title: string;
  shouldDisplayBackBtn: boolean;
};

const HeaderBar: React.FC<HeaderBarProps> = ({title, shouldDisplayBackBtn}) => {
  const theme = useTheme();
  return (
    <Appbar.Header style={{backgroundColor: theme.colors.elevation.level2}}>
      {shouldDisplayBackBtn && <Appbar.BackAction onPress={back} />}
      <Appbar.Content title={title} />
      <Appbar.Action
        icon={({color}) => (
          <MaterialIcon name="settings" size={24} color={color} />
        )}
        onPress={() => navigate('SettingsScreen')}
      />
    </Appbar.Header>
  );
};

export default HeaderBar;
