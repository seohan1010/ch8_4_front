import "./App.css";
import Navigation from "./components/navigation/Navigation";
import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import BoardDetailPage from "./pages/BoardDetailPage";

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
      { index:true, path: "/", element: <HomePage /> },
      {
        path: "/board",
        element: <BoardPage />,
      },
      { path: "/board/:bno", element: <BoardDetailPage /> }
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
