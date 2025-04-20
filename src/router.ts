import { createHashRouter } from 'react-router';

import { Login, routerLinks } from './core';
import AuthLayout from './core/layouts/AuthLayout';
import { DashBoard, reactRouterRouter, tanstackRouter } from './modules';

export const router = createHashRouter([
  {
    path: routerLinks.login,
    Component: Login,
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      { path: '', Component: DashBoard },
      { path: routerLinks.tanStackQuery, children: tanstackRouter },
      { path: routerLinks.reactRouter, children: reactRouterRouter },
      {
        path: routerLinks.reactHookForm,
        lazy: () => import('./modules/reactHookForm').then((m) => ({ Component: m.ReactHookForm })),
      },
      {
        path: routerLinks.redux,
        lazy: () => import('./modules/redux').then((m) => ({ Component: m.ReduxExample })),
      },
      {
        path: routerLinks.zustand,
        lazy: () => import('./modules/zustand').then((m) => ({ Component: m.NotesList })),
      },
      {
        path: routerLinks.three,
        lazy: () => import('./modules/three').then((m) => ({ Component: m.ThreeSphere })),
      },
    ],
  },
]);
