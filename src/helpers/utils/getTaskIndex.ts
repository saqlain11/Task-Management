import { Task } from "model"

const getTaskIndex=(task:Task[],taskId:number)=>{
    return task.findIndex((task)=>task.id===taskId)
}
export default getTaskIndex;