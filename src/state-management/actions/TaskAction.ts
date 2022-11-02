import { createAsyncThunk } from "@reduxjs/toolkit";
import fetcher from "helpers/utils/fetcher";
import { Task } from "model";
const allTask = createAsyncThunk(
  "Task/allTask",
  async (pagination: { page: number; limit: number }, { rejectWithValue }) => {
    let url = `${process.env.REACT_APP_TASK_OPERATION}`;
    let paginationUpdate = { page: 1, limit: 20 };
    try {
      if (pagination.page && pagination.limit) {
        url += `?_page=${pagination.page}&_limit=${pagination.limit}`;
        paginationUpdate = { page: pagination.page, limit: pagination.limit };
      }

      const { data, count }: { data: Task[]; count: number } = await fetcher(
        { url },
        true
      );
      //TODO: have to update this
      return {
        data,
        paginationUpdate: { ...paginationUpdate, total: count || data.length },
      };
    } catch (err) {
      return rejectWithValue("Internal Server Error");
    }
  }
);

const createTask = createAsyncThunk(
  "Task/createTask",
  async (newTask: Task, { rejectWithValue }) => {
    try {
      const options = {
        url: `${process.env.REACT_APP_TASK_OPERATION}`,
        method: "POST",
        data: newTask,
      };
      const data: Task = await fetcher(options, false);
      return data;
    } catch (err) {
      return rejectWithValue("Internal Server Error");
    }
  }
);

const updateTask = createAsyncThunk(
  "Task/updateTask",
  async ({task,taskIndex}:{task:Task,taskIndex:number}, { rejectWithValue }) => {
    try {
      const options = {
        url: `${process.env.REACT_APP_TASK_OPERATION}/${task.id}`,
        method: "PUT",
        data: task,
      };
      const data: Task = await fetcher(options, false);
      return {data,taskIndex};
    } catch (err) {
      return rejectWithValue("Internal Server Error");
    }
  }
);


export { allTask, createTask, updateTask };
