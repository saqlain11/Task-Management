import { Task } from "model";

const getTask = (tasks: Task[], taskID: number) => {
  return tasks.find((task) => {
    return task.id === taskID;
  });
};
export default getTask;
