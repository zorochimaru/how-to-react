import { createBrowserRouter } from "react-router";

import { Login } from "./core";
import AuthLayout from "./core/layouts/AuthLayout";
import { DashBoard, eventRouter } from "./modules";

export const router = createBrowserRouter(
  [
    {
      path: "/login",
      Component: Login,
    },
    {
      path: "/",
      Component: AuthLayout,
      children: [
        { path: "/", Component: DashBoard },
        { path: "events", children: eventRouter },
      ],
    },
  ],
  { basename: "/how-to-react/" }
);
