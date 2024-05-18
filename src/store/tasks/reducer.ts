import {TaskType} from 'src/types';
import {TasksActionsType} from './types';

type TasksStateType = {
  tasks: TaskType[];
};
const initialState: TasksStateType = {
  tasks: [],
};

export default (
  state: TasksStateType = initialState,
  action: {type: TasksActionsType; payload: any},
) => {
  switch (action.type) {
    case TasksActionsType.ADD_SECTION:
      return {...state, sections: [...state.tasks, action.payload.task]};

    case TasksActionsType.CHANGE_TASK_DUE_DATE:
      return {
        ...state,
        section: [
          state.tasks.map(item =>
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
      return {...state, sections: tempTasks};

    case TasksActionsType.MARK_TASK_AS_DONE:
      return {
        ...state,
        section: [
          state.tasks.map(item =>
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

    default:
      return state;
  }
};
