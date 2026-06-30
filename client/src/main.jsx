import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { store } from './app/store.js';
import AppRoutes from './routes/AppRoutes.jsx';

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppRoutes/>
    <ToastContainer />
  </Provider>,
);
