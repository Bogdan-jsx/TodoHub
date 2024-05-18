import {TaskType} from 'src/types';
import {TasksActionsType} from './types';

export const addTask = (task: TaskType) => ({
  type: TasksActionsType.ADD_SECTION,
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
