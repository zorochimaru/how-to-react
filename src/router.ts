import { createBrowserRouter } from 'react-router';

import { basename, Login, routerLinks } from './core';
import AuthLayout from './core/layouts/AuthLayout';
import { DashBoard, reactHookFormRouter, reactRouterRouter, tanstackRouter } from './modules';

export const router = createBrowserRouter(
  [
    {
      path: routerLinks.login,
      Component: Login,
    },
    {
      path: '/',
      Component: AuthLayout,
      children: [
        { path: '/', Component: DashBoard },
        { path: routerLinks.tanStackQuery, children: tanstackRouter },
        { path: routerLinks.reactRouter, children: reactRouterRouter },
        { path: routerLinks.reactHookForm, children: reactHookFormRouter },
      ],
    },
  ],
  { basename: basename },
);
