export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodosState {
  todos: Todo[];
  past: Todo[][];
  future: Todo[][];
}
