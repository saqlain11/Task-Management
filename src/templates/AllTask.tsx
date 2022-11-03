import { TaskList, TaskHeader } from "components";
import { ROUTES, UI_TEXT } from "helpers/constants";
import { useEffect } from "react";
import { allTask, updateTask } from "state-management/actions";
import { useAppDispatch, useAppSelector, useDependencies } from "hooks";
import React from "react";
import { Layout } from "antd";
import { Task } from "model";
import { getSubTask, getTask, getTaskIndex } from "helpers/utils";
import { status } from "model";

const AllTask: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    pagination: { page, limit },
    task,
  } = useAppSelector((state) => state.Task);
  const { getParentTaskID } = useDependencies(task);
  useEffect(() => {
    getAllTask(page, limit);
  }, [dispatch]);

  const getAllTask = (page: number, limit: number): void => {
    dispatch(allTask({ page, limit }));
  };
  const changeStatus = (
    selectedTask: Task,
    isChecked: boolean,
    updatedTask?: Task[]
  ) => {
    //TODO: I know this is quick and dirty approach, this code needs a haircut :D
    const selectedIndex = getTaskIndex(task, selectedTask.id);
    let isCompleted = true;
    let isDone = false;
    if (selectedTask.subTask.length) {
      const subTask = getSubTask(updatedTask || task, selectedTask);
      isCompleted = subTask.every((task) => task.status === "COMPLETE");
      isDone = subTask.some((task) => task.status === "COMPLETE");
    }
    let taskStatus: status = "IN PROGRESS";
    if (isChecked || isDone) {
      if (isCompleted) taskStatus = "COMPLETE";
      else taskStatus = "DONE";
    }
    selectedTask = { ...selectedTask, status: taskStatus };
    const updated = [...task];
    updated[selectedIndex] = selectedTask;
    const parents = getParentTaskID(selectedTask.id); //This code is backtracking

    for (const parent of parents) {
      changeStatus(getTask(task, parent), isChecked, updated);
    }
    dispatch(updateTask({ task: selectedTask, taskIndex: selectedIndex }));
  };

  return (
    <Layout style={{ height: "100vh", padding: "16px", overflow: "scroll" }}>
      <TaskHeader
        buttonTitle={UI_TEXT.ALL_TASK.HEADER.ADD_NEW_TASK}
        url={ROUTES.ADD_TASK}
      />
      <TaskList getAllTask={getAllTask} changeStatus={changeStatus} />
    </Layout>
  );
};
export default AllTask;
