import {SectionType, SectionsActionsType} from './types';

type SectionsStateType = {
  sections: SectionType[];
  selectedSection: string;
};
const initialState: SectionsStateType = {
  sections: [],
  selectedSection: '',
};

export default (
  state: SectionsStateType = initialState,
  action: {type: SectionsActionsType; payload: any},
) => {
  switch (action.type) {
    case SectionsActionsType.SET_SELECTED_SECTION:
      return {...state, selectedSection: action.payload.id};

    case SectionsActionsType.ADD_SECTION:
      return {...state, sections: [...state.sections, action.payload.section]};

    case SectionsActionsType.CHANGE_SECTION_COLOR:
      return {
        ...state,
        sections: [
          ...state.sections.map(item =>
            item.id === action.payload.id
              ? {...item, color: action.payload.color}
              : item,
          ),
        ],
      };

    case SectionsActionsType.DELETE_SECTION:
      const tempSections = [...state.sections];
      const index = tempSections.findIndex(
        item => item.id === action.payload.id,
      );
      tempSections.splice(index, 1);
      return {...state, sections: tempSections};

    default:
      return state;
  }
};
