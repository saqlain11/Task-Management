import { TaskHeader, TaskField, Layout, Form, Alert } from "components";
import { UI_TEXT } from "helpers/constants";
import { getTask } from "helpers/utils";
import { useAppDispatch, useAppSelector, useDependencies } from "hooks";
import { Task } from "model";
import React from "react";
import { useEffect } from "react";
import { allTask, createTask, updateTask } from "state-management/actions";
export interface CreateTask {
  parentTask?: number;
  taskName: string;
  description: string;
}
const CreateTask: React.FC = () => {
  const [form] = Form.useForm();

  const { task, successMessage, errorMessage } = useAppSelector(
    (state) => state.Task
  );
  const { checkCircularDependency } = useDependencies(task);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(allTask({ page: 0, limit: 0 }));
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      console.log("successMessage", successMessage);

      form.resetFields();
    }
  }, [successMessage]);

  const handleSubmit = (taskData: CreateTask) => {
    let hasCycle = false;
    if (taskData.parentTask) {
      hasCycle = checkCircularDependency(taskData.parentTask);
    }
    if (hasCycle) {
      console.log("has cycle");
    } else {
      const parentTask = taskData.parentTask;
      delete taskData.parentTask;
      const data: Task = { ...taskData, status: "IN PROGRESS", subTask: [] };
      dispatch(createTask(data));
      const singleTask = { ...getTask(task, parentTask) };
      if (parentTask) {
        const newTaskId = task[task.length - 1].id + 1;
        singleTask.subTask = [...singleTask.subTask, newTaskId];
        dispatch(updateTask(singleTask));
      }
    }
  };
  return (
    <Layout style={{ height: "100vh", padding: "16px" }}>
      <TaskHeader buttonTitle={UI_TEXT.ALL_TASK.HEADER.ALL_TASK} url="/" />
      {successMessage && (
        <Alert
          message={successMessage}
          type="success"
          closable
          onClose={() => {
            console.log("here");
          }}
        />
      )}
      {!errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          closable
          onClose={() => {
            console.log("here");
          }}
        />
      )}
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <TaskField />
      </Form>
    </Layout>
  );
};

export default CreateTask;
