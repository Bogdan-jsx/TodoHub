import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderBar} from 'src/components/HeaderBar';
import {SettingsDropdownItem} from 'src/components/SettingsDropdownItem';
import {setTheme} from 'src/store/settings/actions';
import {settingsSelector} from 'src/store/settings/selectors';
import {Languages, ThemeType} from 'src/store/settings/types';

const HomeScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();

  const settings = useSelector(settingsSelector);

  const [showThemeDropdown, setShowThemeDropdown] = useState<boolean>(false);
  const [showLanguageDropdown, setShowLanguageDropdown] =
    useState<boolean>(false);

  const themesList = [
    {
      label: t('screens.settings.theme.light'),
      value: ThemeType.Light,
      custom: (
        <SettingsDropdownItem
          text={t('screens.settings.theme.light')}
          isSelected={settings.theme === ThemeType.Light}
        />
      ),
    },
    {
      label: t('screens.settings.theme.dark'),
      value: ThemeType.Dark,
      custom: (
        <SettingsDropdownItem
          text={t('screens.settings.theme.dark')}
          isSelected={settings.theme === ThemeType.Dark}
        />
      ),
    },
    {
      label: t('screens.settings.theme.system'),
      value: ThemeType.System,
      custom: (
        <SettingsDropdownItem
          text={t('screens.settings.theme.system')}
          isSelected={settings.theme === ThemeType.System}
        />
      ),
    },
  ];

  const languagesList = [
    {
      label: t('screens.settings.language.english'),
      value: 'en',
      custom: (
        <SettingsDropdownItem
          text={t('screens.settings.language.english')}
          isSelected={i18n.language === Languages.English}
        />
      ),
    },
    {
      label: t('screens.settings.language.ukrainian'),
      value: 'ua',
      custom: (
        <SettingsDropdownItem
          text={t('screens.settings.language.ukrainian')}
          isSelected={i18n.language === Languages.Ukrainian}
        />
      ),
    },
  ];

  return (
    <>
      <HeaderBar
        title={t('screens.settings.title')}
        shouldDisplayBackBtn={true}
      />
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
        }}>
        <View style={{padding: 8, gap: 8}}>
          <Text variant="titleMedium">{t('screens.settings.theme.title')}</Text>
          <DropDown
            visible={showThemeDropdown}
            onDismiss={() => setShowThemeDropdown(false)}
            showDropDown={() => setShowThemeDropdown(true)}
            list={themesList}
            value={settings.theme}
            setValue={value => dispatch(setTheme(value))}
            mode="flat"
          />
        </View>
        <View style={{padding: 8, gap: 8}}>
          <Text variant="titleMedium">
            {t('screens.settings.language.title')}
          </Text>
          <DropDown
            visible={showLanguageDropdown}
            onDismiss={() => setShowLanguageDropdown(false)}
            showDropDown={() => setShowLanguageDropdown(true)}
            list={languagesList}
            value={i18n.language}
            setValue={value => i18n.changeLanguage(value)}
            mode="flat"
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
