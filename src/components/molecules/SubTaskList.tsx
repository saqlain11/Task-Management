import React from "react";
import { Space, Tag, Table, Checkbox } from "antd";
import { color } from "theme";
import TaskListProps from "./TaskList.props";
import { UI_TEXT } from "helpers/constants";
import type { ColumnsType } from "antd/es/table/interface";

const SubTaskList: React.FC<{ record: TaskListProps }> = ({ record }) => {
  const { subTask } = record;
  const subTaskColumns: ColumnsType<TaskListProps> = [
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
        <Tag color={color.geek_blue}>
          {`${UI_TEXT.ALL_TASK.SUB_TASK.TOTAL_DEPENDENCIES} ${subTask?.length}`}{" "}
        </Tag>
        <Tag
          color={color.dark_blue}
        >{`${UI_TEXT.ALL_TASK.SUB_TASK.DONE_DEPENDENCIES} ${subTask?.length}`}</Tag>
        <Tag color={color.dark_green}>
          {`${UI_TEXT.ALL_TASK.SUB_TASK.COMPLETE_DEPENDENCIES} ${subTask?.length}`}
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
