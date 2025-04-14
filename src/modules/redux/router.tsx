import { RouteObject } from 'react-router';

import { Provider } from 'react-redux';
import { TodoManager } from './pages';
import { store } from './store';

export const reduxRouter: RouteObject[] = [
  {
    path: '',
    element: (
      <Provider store={store}>
        <TodoManager />
      </Provider>
    ),
  },
];
