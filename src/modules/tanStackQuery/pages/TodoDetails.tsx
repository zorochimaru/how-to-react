import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { apiClient, Todo } from '../../../core';

export const TodoDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useQuery<Todo>({
    queryKey: ['todos', id],
    queryFn: async () => {
      const response = await apiClient.get(`/todos/${id}?_limit=10`);
      return response.data;
    },
  });

  if (error) {
    return <div className="flex justify-center items-center h-full">Error</div>;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6 h-full justify-center items-center">
      <a
        href="https://github.com/zorochimaru/how-to-react/blob/main/src/modules/tanStackQuery/pages/TodoList.tsx"
        target="_blank"
        rel="noopener noreferrer"
      >
        Component {'</>'}
      </a>

      <h1 className="text-2xl">Todo Details</h1>

      <div className="border flex flex-col gap-2 p-4 rounded">
        <p className="text-lg">Title: {data?.title}</p>
        <hr />
        <p className="text-lg">Status: {data?.completed ? 'Completed' : 'Not completed'}</p>
      </div>
    </div>
  );
};
