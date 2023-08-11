import type { RouteObject } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Main from "./pages/Main";
import Questions from "./pages/Questions";
import Login from "./pages/Login";

import RootLayout from "./pages/Root";

function App() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "/questions",
          element: <Questions />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
