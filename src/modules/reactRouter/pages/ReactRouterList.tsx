import { Link, useLoaderData, useNavigation } from 'react-router';
import { Todo } from '../../../core';

export const ReactRouterList = () => {
  const todos = useLoaderData<Todo[]>();
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="flex h-full justify-center items-center">
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
