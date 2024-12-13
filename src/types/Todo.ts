export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export enum TodoError {
  LOAD = 'Unable to load todos',
  EMPTY = 'Title should not be empty',
  ADD = 'Unable to add a todo',
  DELETE = 'Unable to delete a todo',
  UPDATE = 'Unable to update a todo',
}

export enum FilterBy {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
