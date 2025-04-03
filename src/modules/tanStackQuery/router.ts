import { RouteObject } from 'react-router';

import { TodoDetails, TodoList } from './pages';

export const tanstackRouter: RouteObject[] = [
  {
    path: '',
    Component: TodoList,
  },
  {
    path: ':id',
    Component: TodoDetails,
  },
];
