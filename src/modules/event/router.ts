import { RouteObject } from "react-router";
import { Event, Events } from "./pages";

export const eventRouter: RouteObject[] = [
  {
    path: "",
    Component: Events,
  },
  {
    path: ":id",
    Component: Event,
    loader: ({ request, params }) =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`, {
        signal: request.signal,
      }),
  },
];
