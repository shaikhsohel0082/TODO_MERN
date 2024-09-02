import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/Reducer/todoReducer";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
