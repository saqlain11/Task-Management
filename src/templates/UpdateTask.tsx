import { TaskHeader, TaskField, Layout, Form } from "components";
import { API_MESSAGES, UI_TEXT, UI_VALIDATION } from "helpers/constants";
import { getTask, getTaskIndex, toast } from "helpers/utils";
import { useAppDispatch, useAppSelector, useDependencies } from "hooks";
import { Task } from "model";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { allTask, updateTask } from "state-management/actions";
export interface CreateTask {
  parentTask?: number;
  taskName: string;
  description: string;
}

const UpdateTask: React.FC = () => {
  const [form] = Form.useForm();
  const { taskId, subTaskId } = useParams();
  const dispatch = useAppDispatch();

  const { task } = useAppSelector((state) => state.Task);
  const { checkCircularDependency } = useDependencies(task);
  useEffect(() => {
    if (task.length) {
      form.setFieldsValue({ ...getTask(task, +taskId), parentTask: subTaskId });
    }
  }, [task]);

  useEffect(() => {
    dispatch(allTask({ page: 0, limit: 0 }));
  }, [dispatch]);

  const changeStatus = (UpdatedTask: Task) => {
    // TODO: in this have to check get parent of that
    //  if exist then backtrack track to its parent to propagate,
    //  so on
    //  due to time constraint i'm unable to write that code just wrote the sudo code same as the all task status propagation
    // this function will be recursive
    console.log("UpdatedTask", UpdatedTask);
  };

  const handleSubmit = (taskData: CreateTask) => {
    let hasCycle = false;
    const newParentTaskID = taskData.parentTask;
    if (newParentTaskID) {
      hasCycle = checkCircularDependency(taskData.parentTask, +taskId);
    }

    if (hasCycle) {
      toast({
        message: UI_TEXT.COMMON.Task_MANAGEMENT_SYSTEM,
        description: UI_VALIDATION.CYCLE_DEPENDENCY,
        type: "error",
      });
    } else {
      //have to add subtask in the parent task and remove old task from parent
      delete taskData.parentTask;
      const singleTask = { ...getTask(task, +taskId), ...taskData };
      let taskIndex = getTaskIndex(task, singleTask.id);
      dispatch(updateTask({ task: singleTask, taskIndex }));
      if (newParentTaskID) {
        if (newParentTaskID !== +taskId) {
          // TODO: can be refactor but due to time constraint not able to do so
          const newParentTask = { ...getTask(task, newParentTaskID) };
          taskIndex = getTaskIndex(task, newParentTask.id);
          newParentTask.subTask = [
            ...new Set([...newParentTask.subTask, singleTask.id]),
          ];
          dispatch(updateTask({ task: newParentTask, taskIndex }));
          if (+taskId && +subTaskId) {
            const oldParentTask = { ...getTask(task, +taskId) };
            taskIndex = getTaskIndex(task, oldParentTask.id);
            const subTaskIndex = oldParentTask.subTask.indexOf(singleTask.id);
            const newSubTask = [...oldParentTask.subTask];
            newSubTask.splice(subTaskIndex, 1);
            dispatch(
              updateTask({
                task: { ...oldParentTask, subTask: newSubTask },
                taskIndex,
              })
            );
          }
          changeStatus(singleTask);

          //Adjust this to global state
          toast({
            message: UI_TEXT.COMMON.Task_MANAGEMENT_SYSTEM,
            description: API_MESSAGES.TASK_ADDED_SUCCESS,
            type: "success",
          });
        }
      }
    }
  };
  return (
    <Layout style={{ height: "100vh", padding: "16px" }}>
      <TaskHeader buttonTitle={UI_TEXT.ALL_TASK.HEADER.ALL_TASK} url="/" />
      <Form
        name="updateTaskForm"
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        <TaskField buttonTitle={UI_TEXT.UPDATE_TASK.CTA.UPDATE_TASK} />
      </Form>
    </Layout>
  );
};

export default UpdateTask;
