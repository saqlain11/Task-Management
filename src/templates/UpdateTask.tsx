import { TaskHeader, TaskField, Layout, Form } from "components";
import { UI_TEXT } from "helpers/constants";
import { getTask, getTaskIndex, toast } from "helpers/utils";
import { useAppDispatch, useAppSelector, useDependencies } from "hooks";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { allTask, updateTask } from "state-management/actions";
import { clearMessages } from "state-management/reducer";
export interface CreateTask {
    parentTask?: number;
    taskName: string;
    description: string;
  }

const UpdateTask: React.FC = () => {
        const [form] = Form.useForm();
        const { taskId,subTaskId } = useParams();
        
      
        const { task, successMessage, errorMessage } = useAppSelector(
          (state) => state.Task
        );
        const { checkCircularDependency } = useDependencies(task);
        const dispatch = useAppDispatch();
        useEffect(() => {
            console.log("taskId",taskId,"subTaskId",subTaskId);
            
        },[task])

        useEffect(() => {
          dispatch(allTask({ page: 0, limit: 0 }));
        }, [dispatch]);
      
        useEffect(() => {
          if (successMessage) {
            form.resetFields();
            toast({
              message: UI_TEXT.COMMON.Task_MANAGEMENT_SYSTEM,
              description: successMessage,
              type: "success",
              onClose: () => {
                dispatch(clearMessages());
              },
            });
          } else if (errorMessage) {
            toast({
              message: UI_TEXT.COMMON.Task_MANAGEMENT_SYSTEM,
              description: errorMessage,
              type: "error",
              onClose: () => {
                dispatch(clearMessages());
              },
            });
          }
        }, [successMessage, errorMessage]);
      
        const handleSubmit = (taskData: CreateTask) => {
          let hasCycle = false;
          const parentTask = taskData.parentTask;
          if (parentTask) {
            hasCycle = checkCircularDependency(taskData.parentTask);
          }
          if (hasCycle) {
            toast({
                message: UI_TEXT.COMMON.Task_MANAGEMENT_SYSTEM,
                description: errorMessage,
                type: "error",
              });
          } else {
            delete taskData.parentTask
            //After creating a task have to add subtask in the parent task
            if (parentTask) {
              const singleTask = { ...getTask(task, parentTask) };
              const taskIndex=getTaskIndex(task,singleTask.id)
              const newTaskId = task[task.length - 1].id + 1;
              singleTask.subTask = [...singleTask.subTask, newTaskId];
              dispatch(updateTask({task:singleTask,taskIndex}));
            }
          }
        };
        return (
          <Layout style={{ height: "100vh", padding: "16px" }}>
            <TaskHeader buttonTitle={UI_TEXT.ALL_TASK.HEADER.ALL_TASK} url="/" />
            <Form layout="vertical" form={form} onFinish={handleSubmit} >
              <TaskField />
            </Form>
          </Layout>
        );
      };
      
export default UpdateTask;
