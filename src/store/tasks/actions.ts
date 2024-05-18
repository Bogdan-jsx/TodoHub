import {TaskType} from 'src/types';
import {TasksActionsType} from './types';

export const addTask = (task: TaskType) => ({
  type: TasksActionsType.ADD_TASK,
  payload: {task},
});

export const changeTaskDueDate = (id: string, date: Date) => ({
  type: TasksActionsType.CHANGE_TASK_DUE_DATE,
  payload: {date, id},
});

export const deleteTask = (id: string) => ({
  type: TasksActionsType.DELETE_TASK,
  payload: {id},
});

export const markTaskAsRead = (id: string) => ({
  type: TasksActionsType.MARK_TASK_AS_DONE,
  payload: {id},
});

export const setIsFromSection = (isFromSection: boolean) => ({
  type: TasksActionsType.SET_IS_FROM_SECTION,
  payload: {isFromSection},
});
