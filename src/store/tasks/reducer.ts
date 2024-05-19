import {TaskType} from 'src/types';
import {TasksActionsType} from './types';

type TasksStateType = {
  tasks: TaskType[];
  isFromSection: boolean;
  selectedTask: string;
};
const initialState: TasksStateType = {
  tasks: [],
  isFromSection: false,
  selectedTask: '',
};

export default (
  state: TasksStateType = initialState,
  action: {type: TasksActionsType; payload: any},
) => {
  switch (action.type) {
    case TasksActionsType.ADD_TASK:
      return {...state, tasks: [...state.tasks, action.payload.task]};

    case TasksActionsType.CHANGE_TASK_DUE_DATE:
      return {
        ...state,
        tasks: [
          ...state.tasks.map(item =>
            item.id === action.payload.id
              ? {...item, dueDate: action.payload.date}
              : item,
          ),
        ],
      };

    case TasksActionsType.DELETE_TASK:
      const tempTasks = [...state.tasks];
      const index = tempTasks.findIndex(item => item.id === action.payload.id);
      tempTasks.splice(index, 1);
      return {...state, tasks: tempTasks};

    case TasksActionsType.MARK_TASK_AS_DONE:
      return {
        ...state,
        tasks: [
          ...state.tasks.map(item =>
            item.id === action.payload.id
              ? {
                  ...item,
                  subTasks: item.subTasks.map(subItem => ({
                    ...subItem,
                    isDone: true,
                  })),
                }
              : item,
          ),
        ],
      };

    case TasksActionsType.SET_IS_FROM_SECTION:
      return {...state, isFromSection: action.payload.isFromSection};

    case TasksActionsType.MARK_SUBTASK_AS_DONE:
      return {
        ...state,
        tasks: [
          ...state.tasks.map(item =>
            item.id === action.payload.taskId
              ? {
                  ...item,
                  subTasks: [
                    ...item.subTasks.map(subtaskItem =>
                      subtaskItem.id === action.payload.subtaskId
                        ? {...subtaskItem, isDone: true}
                        : subtaskItem,
                    ),
                  ],
                }
              : item,
          ),
        ],
      };

    case TasksActionsType.MARK_SUBTASK_AS_UNDONE:
      return {
        ...state,
        tasks: [
          ...state.tasks.map(item =>
            item.id === action.payload.taskId
              ? {
                  ...item,
                  subTasks: [
                    ...item.subTasks.map(subtaskItem =>
                      subtaskItem.id === action.payload.subtaskId
                        ? {...subtaskItem, isDone: false}
                        : subtaskItem,
                    ),
                  ],
                }
              : item,
          ),
        ],
      };

    case TasksActionsType.ADD_SUBTASKS_TO_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks.map(item =>
            item.id === action.payload.taskId
              ? {
                  ...item,
                  subTasks: [...item.subTasks, ...action.payload.subtasks],
                }
              : item,
          ),
        ],
      };

    case TasksActionsType.DELETE_SUBTASKS:
      return {
        ...state,
        tasks: [
          ...state.tasks.map(item =>
            item.id === action.payload.taskId
              ? {
                  ...item,
                  subTasks: [
                    ...item.subTasks.filter(
                      subtask =>
                        !action.payload.subtaskIds.includes(subtask.id),
                    ),
                  ],
                }
              : item,
          ),
        ],
      };

    case TasksActionsType.SET_SELECTED_TASK:
      return {...state, selectedTask: action.payload.taskId};

    default:
      return state;
  }
};
