import {TaskType} from 'src/types';

export enum ActionsNames {
  Details = 'See details',
  ChangeDate = 'Change due date',
  Delete = 'Delete',
  MarkAsDone = 'Mark task as done',
}

export const CONTEXT_MENU_ACTIONS = [
  {title: ActionsNames.Details},
  {title: ActionsNames.MarkAsDone},
  {title: ActionsNames.ChangeDate},
  {title: ActionsNames.Delete},
];

export const MOCK_TASK: TaskType = {
  id: 'kjefgrngjher',
  title: 'Mock task 1',
  sectionId: 'fejfwif',
  dueDate: '2024-05-18',
  subTasks: [
    {
      id: 'feklrg',
      title: 'Mock subtask 1',
      isDone: false,
    },
    {
      id: 'fekgergelrg',
      title: 'Mock subtask 2',
      isDone: true,
    },
  ],
};
