import "./App.css";
import Navigation from "./components/navigation/Navigation";
import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import BoardDetailPage from "./pages/BoardDetailPage";
import BoardEditPage from "./pages/BoardEditPage";
import NewBoardPage from "./pages/NewBoardPage";

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
        loader: async () => {  const url = "http://localhost/board/board";
        const obj = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(url, obj)
          .then((res) => res.json())
          .catch((err) => err);
  
        const boardList = response;
        console.log(boardList ? boardList : "");
        return boardList;
        },
      },
      { path: "/board/new", element: <NewBoardPage /> },
      { path: "/board/:bno", element: <BoardDetailPage /> },
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
