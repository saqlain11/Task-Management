import { Checkbox, TableProps } from "antd";
import { Table } from "antd";
import type { ColumnsType, FilterValue } from "antd/es/table/interface";
import { useAppSelector } from "hooks";
import { Task } from "model";
import React, { useState } from "react";
import SubTaskList from "./SubTaskList";

const TaskList: React.FC<{
  getAllTask: (page: number, limit: number) => void;
}> = ({ getAllTask }) => {
  const {
    isLoading,
    pagination: { page, limit, total },
    task,
  } = useAppSelector((state) => state.Task);

  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});

  const handleChange: TableProps<Task>["onChange"] = (pagination, filters) => {
    setFilteredInfo(filters);
    if (page !== pagination.current || limit !== pagination.pageSize) {
      getAllTask(pagination.current || page, pagination.pageSize || limit);
    }
  };
  const columns: ColumnsType<Task> = [
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
      onFilter: (value: string, record: Task) => record.status.includes(value),
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
        loading={isLoading}
        columns={columns}
        dataSource={task}
        onChange={handleChange}
        expandable={{
          expandedRowRender: (record) => {
            const subTask = record.subTask?.map((taskId) => {
              return task.find((task) => {
                return taskId === task.id;
              });
            });

            return <SubTaskList subTask={subTask} />;
          },
          rowExpandable: (record) => !!record.subTask?.length,
        }}
        pagination={{
          total: total,
          pageSize: limit,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        scroll={{ y: 400 }}
      />
    </>
  );
};

export default TaskList;
