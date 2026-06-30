import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { store } from "./app/store.js";
import AppRoutes from "./routes/AppRoutes.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={AppRoutes} />
    console.log("API URL:", import.meta.env.VITE_API_URL); console.log("Socket
    URL:", import.meta.env.VITE_SOCKET_URL);
    <ToastContainer />
  </Provider>,
);
