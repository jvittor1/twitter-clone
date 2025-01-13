import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./router/route.tsx";
import { UserProvider } from "./context/user-context.tsx";
import { TweetProvider } from "./context/tweet-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <TweetProvider>
        <RouterProvider router={routes} />
      </TweetProvider>
    </UserProvider>
  </StrictMode>,
);
