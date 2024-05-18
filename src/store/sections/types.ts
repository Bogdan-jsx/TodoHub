export enum SectionsActionsType {
  ADD_SECTION = 'ADD_SECTION',
  CHANGE_SECTION_COLOR = 'CHANGE_SECTION_COLOR',
  DELETE_SECTION = 'DELETE_SECTION',
  SET_SELECTED_SECTION = 'SET_SELECTED_SECTION',
}

export type SectionType = {
  name: string;
  id: string;
  color: string;
};
