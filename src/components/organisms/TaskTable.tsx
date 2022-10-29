import { TaskList, TaskHeader } from "components/molecules";
import { useAppSelector } from "hooks";
import React from "react";
const TaskTable: React.FC = () => {
  return (
    <>
      <TaskHeader />
      <TaskList />
    </>
  );
};
export default TaskTable;
