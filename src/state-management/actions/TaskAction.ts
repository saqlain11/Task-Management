import { createAsyncThunk } from "@reduxjs/toolkit";

const allTask = createAsyncThunk("Task/allTask", () => {});

const createTask = createAsyncThunk("Task/createTask", () => {});

const editTask = createAsyncThunk("Task/editTask", () => {});

const changeStatus = createAsyncThunk("Task/changeStatus", () => {});
