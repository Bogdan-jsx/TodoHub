import {Languages, SettingsActionType, ThemeType} from './types';

type SettingsStateType = {
  theme: ThemeType;
  language: Languages;
};
const initialState: SettingsStateType = {
  theme: ThemeType.System,
  language: Languages.English,
};

export default (
  state: SettingsStateType = initialState,
  action: {type: SettingsActionType; payload: any},
) => {
  switch (action.type) {
    case SettingsActionType.SET_THEME:
      return {...state, theme: action.payload.theme};

    case SettingsActionType.SET_LANGUAGE:
      return {...state, theme: action.payload.language};

    default:
      return state;
  }
};
