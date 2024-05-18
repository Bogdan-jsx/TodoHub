import {SectionType, SectionsActionsType} from './types';

export const addSection = (section: SectionType) => ({
  type: SectionsActionsType.ADD_SECTION,
  payload: {section},
});

export const changeSectionColor = (color: string, id: string) => ({
  type: SectionsActionsType.CHANGE_SECTION_COLOR,
  payload: {color, id},
});

export const deleteSection = (id: string) => ({
  type: SectionsActionsType.DELETE_SECTION,
  payload: {id},
});
