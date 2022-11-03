import React, { useEffect } from "react";
import { Space, Tag, Table, Checkbox } from "antd";
import { color } from "theme";
import { ROUTES, UI_TEXT } from "helpers/constants";
import type { ColumnsType } from "antd/es/table/interface";
import { useState } from "react";
import { calculateDependencies } from "helpers/utils";
import { Task } from "model";
import { Link } from "react-router-dom";

type dependencies = {
  total: number;
  done: number;
  complete: number;
};
interface SubTaskListProps {
  subTask: Task[];
  changeStatus: (task: Task, isChecked: boolean) => void;
  parentTaskID: number;
}
const SubTaskList: React.FC<SubTaskListProps> = ({
  subTask,
  changeStatus,
  parentTaskID,
}) => {
  const [dependencies, setDependencies] = useState<dependencies>({
    total: 0,
    done: 0,
    complete: 0,
  });
  useEffect(() => {
    if (subTask?.length) {
      setDependencies(calculateDependencies(subTask));
    }
  }, [subTask]);

  const subTaskColumns: ColumnsType<Task> = [
    {
      title: "Task ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
    },
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
    },
    {
      title: "Change Status",
      dataIndex: "status",
      render: (text, record) => (
        <Checkbox
          disabled={!!record.subTask.length}
          onChange={(event) => {
            changeStatus(record, event.target.checked);
          }}
          checked={["DONE", "COMPLETE"].includes(text)}
        >
          {"DONE"}
        </Checkbox>
      ),
      ellipsis: true,
    },
    {
      title: "Action",
      render: (record) => (
        <Link
          to={`${ROUTES.UPDATE_TASK.replace(
            ":taskId",
            record.id
          )}/${parentTaskID}`}
        >
          {UI_TEXT.ALL_TASK.TASK.EDIT}
        </Link>
      ),
      ellipsis: true,
    },
  ];
  return (
    <>
      <Space direction="horizontal">
        {/* TODO: have to handle with Map */}
        <Tag color={color.geek_blue}>
          {`${UI_TEXT.ALL_TASK.SUB_TASK.TOTAL_DEPENDENCIES} ${dependencies.total}`}
        </Tag>
        <Tag
          color={color.dark_blue}
        >{`${UI_TEXT.ALL_TASK.SUB_TASK.DONE_DEPENDENCIES} ${dependencies.done}`}</Tag>
        <Tag color={color.dark_green}>
          {`${UI_TEXT.ALL_TASK.SUB_TASK.COMPLETE_DEPENDENCIES} ${dependencies.complete}`}
        </Tag>
      </Space>
      <Table
        rowKey="id"
        columns={subTaskColumns}
        dataSource={subTask}
        pagination={false}
      ></Table>
    </>
  );
};

export default SubTaskList;
