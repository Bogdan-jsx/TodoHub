import {SubTaskType, TaskType} from 'src/types';
import {TasksActionsType} from './types';

export const addTask = (task: TaskType) => ({
  type: TasksActionsType.ADD_TASK,
  payload: {task},
});

export const changeTaskDueDate = (id: string, date: string) => ({
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

export const markSubtaskAsDone = (taskId: string, subtaskId: string) => ({
  type: TasksActionsType.MARK_SUBTASK_AS_DONE,
  payload: {taskId, subtaskId},
});

export const markSubtaskAsUndone = (taskId: string, subtaskId: string) => ({
  type: TasksActionsType.MARK_SUBTASK_AS_UNDONE,
  payload: {taskId, subtaskId},
});

export const addSubtasksToTask = (taskId: string, subtasks: SubTaskType[]) => ({
  type: TasksActionsType.ADD_SUBTASKS_TO_TASK,
  payload: {taskId, subtasks},
});

export const deleteSubtasks = (taskId: string, subtaskIds: string[]) => ({
  type: TasksActionsType.DELETE_SUBTASKS,
  payload: {taskId, subtaskIds},
});

export const setSelectedTask = (taskId: string) => ({
  type: TasksActionsType.SET_SELECTED_TASK,
  payload: {taskId},
});
