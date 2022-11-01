import { TaskList, TaskHeader } from "components/organisms";
import { ROUTES, UI_TEXT } from "helpers/constants";
import { useEffect } from "react";
import { allTask } from "state-management/actions";
import { useAppDispatch, useAppSelector } from "hooks";
import React from "react";
import { Layout } from "antd";
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
    <Layout style={{ height: "100vh", padding: "16px", overflow: "scroll" }}>
      <TaskHeader
        buttonTitle={UI_TEXT.ALL_TASK.HEADER.ADD_NEW_TASK}
        url={ROUTES.ADD_TASK}
      />
      <TaskList getAllTask={getAllTask} />
    </Layout>
  );
};
export default AllTask;
