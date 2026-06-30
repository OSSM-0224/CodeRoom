import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import EditorPage from "../features/editor/pages/EditorPage.new";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/editor/:roomId",
    element: <EditorPage />,
  },
]);

export default AppRoutes;
