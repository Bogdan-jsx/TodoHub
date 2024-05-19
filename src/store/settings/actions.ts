import {Languages, SettingsActionType, ThemeType} from './types';

export const setTheme = (theme: ThemeType) => ({
  type: SettingsActionType.SET_THEME,
  payload: {theme},
});

export const setLanguage = (language: Languages) => ({
  type: SettingsActionType.SET_LANGUAGE,
  payload: {language},
});
