import { createAsyncThunk } from "@reduxjs/toolkit";
import fetcher from "helpers/utils/fetcher";
import { Task } from "state-management/reducer/taskReducer";
const allTask = createAsyncThunk(
  "Task/allTask",
  async (pagination: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const data: Task[] = await fetcher({
        url: `${process.env.REACT_APP_TASK_OPERATION}?_page=${pagination.page}&_limit=${pagination.limit}`,
      });
      return { data, pagination };
    } catch (err) {
      return rejectWithValue("Internal Server Error");
    }
  }
);

// const createTask = createAsyncThunk("Task/createTask", () => {});

// const editTask = createAsyncThunk("Task/editTask", () => {});

// const changeStatus = createAsyncThunk("Task/changeStatus", () => {});

export { allTask };
