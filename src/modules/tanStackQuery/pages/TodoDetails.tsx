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
    <div className="flex flex-col gap-3 h-full justify-center items-center">
      <p>{data?.title}</p>
      <p>{data?.completed ? 'Completed' : 'Not completed'}</p>
    </div>
  );
};
