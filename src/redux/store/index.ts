import { configureStore } from "@reduxjs/toolkit";
import { TaskReducer } from "redux/reducer";

const store = configureStore({
  reducer: {
    Task: TaskReducer,
  },
});

export default store;
