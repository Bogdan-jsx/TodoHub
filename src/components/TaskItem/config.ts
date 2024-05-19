export enum ActionsNames {
  Details = 'taskItem.contextMenu.seeDetails',
  ChangeDate = 'taskItem.contextMenu.changeDate',
  Delete = 'taskItem.contextMenu.delete',
  MarkAsDone = 'taskItem.contextMenu.markAsDone',
}

export const CONTEXT_MENU_ACTIONS = [
  {title: ActionsNames.Details},
  {title: ActionsNames.MarkAsDone},
  {title: ActionsNames.ChangeDate},
  {title: ActionsNames.Delete},
];
