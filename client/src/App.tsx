import type { RouteObject } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Main from "./pages/Main";
import Questions from "./pages/Questions";
import RootLayout from "./pages/Root";
import Write from "./pages/Write";

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
          path: "/questions/:id",
          element: <Questions />,
        },
      ],
    },
    {
      path: "/write",
      element: <Write />,
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
