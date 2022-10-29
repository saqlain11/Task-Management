import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "state-management/reducer";

const store = configureStore({
  reducer: {
    Tasks: taskReducer,
  },
});

export default store;
