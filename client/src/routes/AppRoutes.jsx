import { createBrowserRouter } from "react-router";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import EditorPage from "../features/editor/pages/EditorPage";
import { RouterProvider } from "react-router";
import { RouterProvider } from "react-router";

const router = createBrowserRouter([
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/editor/:roomId",
        element: <EditorPage />,
    },
]);

const AppRoutes = () => {
  return (
    <RouterProvider router={router} />
  )
}

const AppRoutes = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default AppRoutes;
