import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { addTodo, deleteTodo, redo, toggleTodo, undo } from '../slices/todosSlice';

export const TodoManager = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const todos = useAppSelector((state) => state.todos.todos);
  const past = useAppSelector((state) => state.todos.past);
  const future = useAppSelector((state) => state.todos.future);

  const handleAdd = () => {
    if (text.trim() === '') return;
    dispatch(addTodo(text.trim()));
    setText('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Todo Manager</h1>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          placeholder="New todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded dark:bg-blue-400 dark:hover:bg-blue-500"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border-b py-1 border-gray-300 dark:border-gray-600"
          >
            <span
              className={`cursor-pointer ${
                todo.completed
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-900 dark:text-gray-100'
              }`}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              className="text-sm text-red-500 hover:underline dark:text-red-400 dark:hover:text-red-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <button
          onClick={() => dispatch(undo())}
          disabled={past.length === 0}
          className={`px-3 py-1 rounded ${
            past.length === 0
              ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
              : 'bg-yellow-400 hover:bg-yellow-500 text-white dark:bg-yellow-300 dark:hover:bg-yellow-400'
          }`}
        >
          Undo
        </button>
        <button
          onClick={() => dispatch(redo())}
          disabled={future.length === 0}
          className={`px-3 py-1 rounded ${
            future.length === 0
              ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
              : 'bg-green-400 hover:bg-green-500 text-white dark:bg-green-300 dark:hover:bg-green-400'
          }`}
        >
          Redo
        </button>
      </div>
    </div>
  );
};
