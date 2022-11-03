import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { API_MESSAGES } from "helpers/constants";
import { Task } from "model";
import { allTask, createTask, updateTask } from "state-management/actions";

export interface TaskState {
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  task: Array<Task>;
}
const initialTaskState: TaskState = {
  isLoading: false,
  errorMessage: "",
  successMessage: "",
  task: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
  },
};

const taskReducer = createSlice({
  name: "Task",
  initialState: initialTaskState,
  reducers: {
    clearMessages: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(allTask.fulfilled, (state: TaskState, { payload }) => {
      state.isLoading = false;
      state.task = payload.data;
      state.pagination = payload.paginationUpdate;
    });

    builder.addCase(createTask.fulfilled, (state: TaskState, { payload }) => {
      state.isLoading = false;
      state.task.push(payload);
      state.successMessage = API_MESSAGES.TASK_ADDED_SUCCESS;
    });

    builder.addCase(updateTask.fulfilled, (state: TaskState, { payload }) => {
      state.isLoading = false;
      state.task[payload.taskIndex] = payload.data;
    });

    builder.addCase(allTask.rejected, (state: TaskState, { payload }) => {
      state.isLoading = false;
      state.task = [];
      state.errorMessage = payload as string;
    });

    builder.addCase(createTask.rejected, (state: TaskState, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload as string;
    });

    builder.addMatcher(
      isAnyOf(allTask.pending, createTask.pending, updateTask.pending),
      (state: TaskState) => {
        state.isLoading = true;
      }
    );
  },
});
const { clearMessages } = taskReducer.actions;
export { clearMessages };
export default taskReducer.reducer;
