import {View} from 'react-native';
import {ColorIndicator} from './SectionDropdownItem.styled';
import React, {useMemo} from 'react';
import {Text, useTheme} from 'react-native-paper';

type SectionDropdownItemProps = {
  text: string;
  color: string;
  isSelected: boolean;
};

const SectionDropdownItem: React.FC<SectionDropdownItemProps> = ({
  text,
  color,
  isSelected,
}) => {
  const theme = useTheme();
  const textColor = useMemo(
    () => (isSelected ? theme.colors.primary : theme.colors.onSurface),
    [isSelected, theme.colors.onSurface, theme.colors.primary],
  );
  return (
    <View style={{flexDirection: 'row', paddingTop: 6}}>
      <ColorIndicator color={color} />
      <Text style={{color: textColor}}>{text}</Text>
    </View>
  );
};

export default SectionDropdownItem;
