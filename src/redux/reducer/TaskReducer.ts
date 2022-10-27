import { createSlice } from "@reduxjs/toolkit";

//TODO: Have to maintain this in separate type def file
type status="In-Progress" | "Done" | "Complete"

interface Tasks{
    name:string,
    status:status,
    description:string,
    subTasks?:{
        name:string,
        status:status,
    },
    connections?:Array<{
        name:string
    }>
}
export interface TaskState {
    isLoading: boolean,
    errorMessage:string,
    tasks: Array<Tasks>
  }
  const initialTaskState: TaskState={
    isLoading:false,
    errorMessage:"",
    tasks:[
    ]
  }


const TaskReducer = createSlice({
  name: "Task",
    initialState: initialTaskState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase()
  },
});
export default TaskReducer;
