import { Task } from "model";

  const getSubTask =(tasks:Task[],selectedTask:Task)=>{
    return selectedTask.subTask?.map((taskId) => {
      return tasks.find((task) => {
        return taskId === task.id;
      });
    });
  } 
  export default getSubTask;