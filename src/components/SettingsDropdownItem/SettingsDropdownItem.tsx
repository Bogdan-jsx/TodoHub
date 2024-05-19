import React, {useMemo} from 'react';
import {Text, useTheme} from 'react-native-paper';

type SectionDropdownItemProps = {
  text: string;
  isSelected: boolean;
};

const SectionDropdownItem: React.FC<SectionDropdownItemProps> = ({
  text,
  isSelected,
}) => {
  const theme = useTheme();
  const textColor = useMemo(
    () => (isSelected ? theme.colors.primary : theme.colors.onSurface),
    [isSelected, theme.colors.onSurface, theme.colors.primary],
  );
  return <Text style={{color: textColor}}>{text}</Text>;
};

export default SectionDropdownItem;
