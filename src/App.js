import "./App.css";
import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import BoardDetailPage from "./pages/BoardDetailPage";
import BoardEditPage from "./pages/BoardEditPage";
import NewBoardPage from "./pages/NewBoardPage";
import { loader as boardLoader } from "./pages/BoardPage";
import { loader as boardDetailLoader } from "./pages/BoardDetailPage";
import Test from "./pages/Test";


import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
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
    children: [
      { index: true, path: "/", element: <HomePage /> },
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
      { path: "/Test", element: <Test /> },
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
