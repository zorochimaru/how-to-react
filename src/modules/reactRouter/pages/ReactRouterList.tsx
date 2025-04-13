import { Link, useLoaderData, useNavigation } from 'react-router';
import { Todo } from '../../../core';

export const ReactRouterList = () => {
  const todos = useLoaderData<Todo[]>();
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

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
      <h1 className="text-2xl">Todo List</h1>
      <ul className="list-none">
        {todos?.map((event) => (
          <Link key={event.id} to={`${event.id}`}>
            <li className="my-2 border-2 p-2 rounded-xl uppercase hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white cursor-pointer">
              {event.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
