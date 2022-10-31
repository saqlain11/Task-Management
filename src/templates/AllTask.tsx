import { TaskList, TaskHeader } from "components/organisms";
import { UI_TEXT } from "helpers/constants";
import { useEffect } from "react";
import { allTask } from "state-management/actions";
import { useAppDispatch, useAppSelector } from "hooks";
import React from "react";
const AllTask: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    pagination: { page, limit },
  } = useAppSelector((state) => state.Task);
  useEffect(() => {
    getAllTask(page, limit);
  }, [dispatch]);

  const getAllTask = (page: number, limit: number): void => {
    dispatch(allTask({ page, limit }));
  };

  return (
    <>
      <TaskHeader buttonTitle={UI_TEXT.ALL_TASK.HEADER.ADD_NEW_TASK} url="" />
      <TaskList getAllTask={getAllTask} />
    </>
  );
};
export default AllTask;
