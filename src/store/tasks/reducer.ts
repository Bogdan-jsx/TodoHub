import {TaskType} from 'src/types';
import {TasksActionsType} from './types';

type TasksStateType = {
  tasks: TaskType[];
  isFromSection: boolean;
};
const initialState: TasksStateType = {
  tasks: [],
  isFromSection: false,
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

    default:
      return state;
  }
};