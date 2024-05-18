import {SectionType, SectionsActionsType} from './types';

type SectionsStateType = {
  sections: SectionType[];
};
const initialState: SectionsStateType = {
  sections: [],
};

export default (
  state: SectionsStateType = initialState,
  action: {type: SectionsActionsType; payload: any},
) => {
  switch (action.type) {
    case SectionsActionsType.ADD_SECTION:
      return {...state, sections: [...state.sections, action.payload.section]};

    case SectionsActionsType.CHANGE_SECTION_COLOR:
      return {
        ...state,
        section: [
          state.sections.map(item =>
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
