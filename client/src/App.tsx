import type { RouteObject } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Error from "./pages/Error";
import Main from "./pages/Main";
import Questions from "./pages/Questions";
import RootLayout from "./pages/Root";
import Write from "./pages/Write";
import LogIn from "./pages/Login";
import SignUp from "./pages/Signup";

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
      path: "/login",
      element: <LogIn />,
    },
    {
      path: "/sign",
      element: <SignUp />,
    },
    {
      path: "/write",
      element: <Write />,
    },
    { path: "*", element: <Error /> },
  ];

  const router = createBrowserRouter(routes);

  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
