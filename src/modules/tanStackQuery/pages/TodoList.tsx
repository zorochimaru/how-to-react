import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { apiClient, Todo } from '../../../core';

const fetchTodos = async () => {
  const response = await apiClient.get('/todos?_limit=10');
  return response.data;
};

export const TodoList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  if (error) {
    return <div className="flex justify-center items-center h-full">Error</div>;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-full">
      <ul className="list-none">
        {data?.map((event: Todo) => (
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
