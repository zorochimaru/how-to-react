import { RouteObject } from 'react-router';

import { ReactRouterDetails, ReactRouterList } from './pages';

export const reactRouterRouter: RouteObject[] = [
  {
    path: '',
    Component: ReactRouterList,
    loader: ({ request }) =>
      fetch(`https://jsonplaceholder.typicode.com/todos/?_limit=10`, {
        signal: request.signal,
      }),
  },
  {
    path: ':id',
    Component: ReactRouterDetails,
    loader: ({ request, params }) =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`, {
        signal: request.signal,
      }),
  },
];
