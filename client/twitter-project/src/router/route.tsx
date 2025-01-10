import App from "@/App";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { createBrowserRouter, Navigate } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      // {
      //      path: "/home",
      //      element: <Home />,
      // },
    ],
  },
]);

export { routes };
