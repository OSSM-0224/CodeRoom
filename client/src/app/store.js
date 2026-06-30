import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "../features/editor/slice/editorSlice";

export const store = configureStore({
  reducer: {
    editor: editorReducer,
  },
});

export default store;
