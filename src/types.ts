export type SubTaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TaskType = {
  id: string;
  title: string;
  sectionId: string;
  dueDate: string;
  subTasks: SubTaskType[];
};
