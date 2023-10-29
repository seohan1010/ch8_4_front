import "./App.css";
import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import BoardDetailPage from "./pages/BoardDetailPage";
import BoardEditPage from "./pages/BoardEditPage";
import NewBoardPage from "./pages/NewBoardPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { loader as boardLoader } from "./pages/BoardPage";
import { loader as boardDetailLoader } from "./pages/BoardDetailPage";
import { loader as tokenLoader } from "./util/auth";
import { action as logoutAction } from "./pages/Logout";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  redirect,
} from "react-router-dom";

// const routerDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/board" element={<BoardListPage />} />
//   </Route>
// );

// const router = createBrowserRouter(routerDefinitions);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: () => {
      const token = localStorage.getItem("email");
      console.log("token is :" + token);
      return token;
    },
    children: [
      { index: true, path: "/", element: <HomePage /> },

      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/logout",
        element: <></>,
        action: () => {
          localStorage.removeItem("email");
          return redirect("/");
        },
      },

      {
        path: "/board",
        element: <BoardPage />,
        loader: boardLoader,
      },

      { path: "/board/new", element: <NewBoardPage /> },
      {
        path: "/board/:bno",
        element: <BoardDetailPage />,
        loader: boardDetailLoader,
      },
      { path: "/board/:bno/edit", element: <BoardEditPage /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <div className="App">
        <HomePage />
        hello
      </div>
    </RouterProvider>
  );
}

export default App;
