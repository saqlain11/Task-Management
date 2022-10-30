import { createSlice } from "@reduxjs/toolkit";

//TODO: Have to maintain this in separate type def file
type status = "IN PROGRESS" | "DONE" | "COMPLETE";

interface Tasks {
  name: string;
  status: status;
  description: string;
  subTasks?: {
    name: string;
    status: status;
  };
  connections?: Array<{
    name: string;
  }>;
}
export interface TaskState {
  isLoading: boolean;
  errorMessage: string;
  page: {
    pageNo: number;
    pageOffset: number;
  };
  tasks: Array<Tasks>;
}
const initialTaskState: TaskState = {
  isLoading: false,
  errorMessage: "",
  tasks: [],
  page: {
    pageNo: 0,
    pageOffset: 20,
  },
};

const taskReducer = createSlice({
  name: "Task",
  initialState: initialTaskState,
  reducers: {},
  extraReducers(builder) {
    // builder.addCase(
    // )
  },
});
export default taskReducer.reducer;
