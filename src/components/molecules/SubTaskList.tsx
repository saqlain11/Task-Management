import React from "react";
import { Space, Tag, Typography } from "antd";
import { Table } from "antd";
import { color } from "theme";
import type { ColumnsType } from "antd/es/table/interface";

interface DataType {
  id: number;
  taskName: string;
  description: string;
  status: string;
}

const SubTaskList: React.FC<{ subTask: DataType[] }> = ({ subTask }) => {
  const subColumns: ColumnsType<DataType> = [
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
  ];
  return (
    <>
      <Space direction="horizontal">
        <Tag color={color.geek_blue}>Total dependencies: {subTask.length} </Tag>
        <Tag color={color.dark_blue}>Done dependencies: {subTask.length} </Tag>
        <Tag color={color.dark_green}>
          Complete dependencies: {subTask.length}{" "}
        </Tag>
      </Space>
      <Table
        rowKey="id"
        columns={subColumns}
        dataSource={subTask}
        pagination={false}
      ></Table>
    </>
  );
};

export default SubTaskList;
