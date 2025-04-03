import { useLoaderData } from 'react-router';
import { Todo } from '../../../core';

export const ReactRouterDetails = () => {
  const todo = useLoaderData<Todo>();

  return (
    <div className="flex flex-col gap-3 h-full justify-center items-center">
      <h1>{todo.title}</h1>
      <p>{todo.completed ? 'Completed' : 'Not completed'}</p>
    </div>
  );
};
