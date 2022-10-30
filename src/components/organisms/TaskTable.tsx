import { TaskList, TaskHeader } from "components/molecules";
import { UI_TEXT } from "helpers/constants";
import React from "react";
const TaskTable: React.FC = () => {
  return (
    <>
      <TaskHeader buttonTitle={UI_TEXT.ALL_TASK.HEADER.ADD_NEW_TASK} url="" />
      <TaskList />
    </>
  );
};
export default TaskTable;
