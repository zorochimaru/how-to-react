import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { TodosState } from '../interfaces';

const initialState: TodosState = {
  todos: [],
  past: [],
  future: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.past.push(state.todos);
      state.future = [];

      state.todos = [...state.todos, { id: nanoid(), text: action.payload, completed: false }];
    },
    toggleTodo(state, action: PayloadAction<string>) {
      state.past.push(state.todos);
      state.future = [];

      state.todos = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo,
      );
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.past.push(state.todos);
      state.future = [];

      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    undo(state) {
      if (state.past.length > 0) {
        const prev = state.past.pop()!;
        state.future.unshift(state.todos);
        state.todos = prev;
      }
    },
    redo(state) {
      if (state.future.length > 0) {
        const next = state.future.shift()!;
        state.past.push(state.todos);
        state.todos = next;
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, undo, redo } = todosSlice.actions;
export default todosSlice.reducer;
