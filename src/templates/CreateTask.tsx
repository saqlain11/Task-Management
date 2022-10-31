import { TaskHeader, TaskForm } from "components";
import { UI_TEXT } from "helpers/constants";
import React from "react";

const CreateTask: React.FC = () => {
  return (
    <>
      <TaskHeader buttonTitle={UI_TEXT.ALL_TASK.HEADER.ALL_TASK} url="" />
      <TaskForm />
    </>
  );
};

export default CreateTask;
