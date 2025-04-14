import { RouteObject } from 'react-router';

import { NotesList } from './pages';

export const zustandRouter: RouteObject[] = [
  {
    path: '',
    Component: NotesList,
  },
];
