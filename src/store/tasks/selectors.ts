import {TaskType} from 'src/types';

export const tasksSelector = (state: any) => state.tasks.tasks;
export const isFromSectionSelector = (state: any) => state.tasks.isFromSection;
export const selectedTaskSelector = (state: any) =>
  state.tasks.tasks.find(
    (item: TaskType) => item.id === state.tasks.selectedTask,
  );
