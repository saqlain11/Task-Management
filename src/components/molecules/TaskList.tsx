import { Checkbox, TableProps, Table } from "antd";
import type { ColumnsType, FilterValue } from "antd/es/table/interface";
import React, { useState } from "react";
import SubTaskList from "./SubTaskList";
import TaskListProps from "./TaskList.props";

const data: TaskListProps[] = [
  {
    id: 1,
    taskName: "Task 1",
    description: "Task 1 description",
    status: "IN PROGRESS",
    subTask: [
      {
        id: 5,
        taskName: "Task 1",
        description: "Task 1 description",
        status: "DONE",
      },
      {
        id: 6,
        taskName: "Task 1",
        description: "Task 1 description",
        status: "DONE",
      },
    ],
  },
  {
    id: 2,
    taskName: "Task 2",
    description: "Task 2 description",
    status: "IN PROGRESS",
  },
  {
    id: 3,
    taskName: "Task 3",
    description: "Task 3 description",
    status: "COMPLETE",
  },
  {
    id: 4,
    taskName: "Task 4",
    description: "Task 4 description",
    status: "DONE",
  },
];

const TaskList: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});

  const handleChange: TableProps<TaskListProps>["onChange"] = (
    pagination,
    filters
  ) => {
    console.log("Various parameters", pagination, filters);
    setFilteredInfo(filters);
  };
  const taskColumns: ColumnsType<TaskListProps> = [
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
      filters: [
        { text: "IN PROGRESS", value: "IN PROGRESS" },
        { text: "DONE", value: "DONE" },
        { text: "COMPLETE", value: "COMPLETE" },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value: string, record: TaskListProps) =>
        record.status.includes(value),
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

    Table.EXPAND_COLUMN,
  ];

  return (
    <>
      <Table
        rowKey="id"
        columns={taskColumns}
        dataSource={data}
        onChange={handleChange}
        expandable={{
          expandedRowRender: (record) => <SubTaskList record={record} />,
          rowExpandable: (record) => !!record.subTask?.length,
        }}
        pagination={{
          total: 0,
          pageSize: 20,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </>
  );
};

export default TaskList;
