import React, { useEffect } from "react";
import { Space, Tag, Table, Checkbox } from "antd";
import { color } from "theme";
import { UI_TEXT } from "helpers/constants";
import type { ColumnsType } from "antd/es/table/interface";
import { useState } from "react";
import { calculateDependencies } from "helpers/utils";
import { Task } from "model";

type dependencies = {
  total: number;
  done: number;
  complete: number;
};
const SubTaskList: React.FC<{ subTask: Task[] }> = ({ subTask }) => {
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
      render: (text) => (
        <Checkbox checked={["DONE", "COMPLETE"].includes(text)}>
          {"DONE"}
        </Checkbox>
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
        onRow={(record) => ({
          onClick: () => {
            console.log("record", record);
          },
        })}
        rowKey="id"
        columns={subTaskColumns}
        dataSource={subTask}
        pagination={false}
      ></Table>
    </>
  );
};

export default SubTaskList;
