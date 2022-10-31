import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "state-management/reducer";

const store = configureStore({
  reducer: {
    Task: taskReducer,
  },
});

export default store;
