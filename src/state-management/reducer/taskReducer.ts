import { createSlice } from "@reduxjs/toolkit";
import { allTask } from "state-management/actions";

//TODO: Have to maintain this in separate type def file
type status = "IN PROGRESS" | "DONE" | "COMPLETE";

export interface Task {
  id: number;
  taskName: string;
  status: status;
  description: string;
  subTask?: number[];
}
export interface TaskState {
  isLoading: boolean;
  errorMessage: string;
  pagination: {
    page: number;
    limit: number;
  };
  task: Array<Task>;
}
const initialTaskState: TaskState = {
  isLoading: false,
  errorMessage: "",
  task: [],
  pagination: {
    page: 1,
    limit: 20,
  },
};

const taskReducer = createSlice({
  name: "Task",
  initialState: initialTaskState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(allTask.pending, (state: TaskState) => {
      state.isLoading = true;
    });
    builder.addCase(allTask.fulfilled, (state: TaskState, { payload }) => {
      state.isLoading = false;
      state.task = payload.data;
      state.pagination = payload.pagination;
    });
  },
});
export default taskReducer.reducer;
