import { useLoaderData } from 'react-router';
import { Todo } from '../../../core';

export const ReactRouterDetails = () => {
  const todo = useLoaderData<Todo>();

  return (
    <div className="flex flex-col gap-6 h-full justify-center items-center">
      <div className="flex gap-10">
        <a
          href="https://github.com/zorochimaru/how-to-react/blob/main/src/modules/reactRouter/router.ts"
          target="_blank"
          rel="noopener noreferrer"
        >
          Router {'</>'}
        </a>
        <a
          href="https://github.com/zorochimaru/how-to-react/blob/main/src/modules/reactRouter/pages/ReactRouterList.tsx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Component {'</>'}
        </a>
      </div>
      <h1 className="text-2xl">Todo Details</h1>
      <div className="border flex flex-col gap-2 p-4 rounded">
        <p className="text-lg">Title: {todo.title}</p>
        <hr />
        <p className="text-lg">Status: {todo.completed ? 'Completed' : 'Not completed'}</p>
      </div>
    </div>
  );
};
