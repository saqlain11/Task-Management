import { Task } from "model";

const getTask = (tasks: Task[], taskID: number) =>
  tasks.find((task) => task.id === taskID);

export default getTask;
