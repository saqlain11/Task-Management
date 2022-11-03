import { Checkbox, TableProps } from "antd";
import { Table } from "antd";
import type { ColumnsType, FilterValue } from "antd/es/table/interface";
import { ROUTES, UI_TEXT } from "helpers/constants";
import { getSubTask } from "helpers/utils";
import { useAppSelector } from "hooks";
import { Task } from "model";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SubTaskList from "./SubTaskList";

interface TaskListProps {
  getAllTask: (page: number, limit: number) => void;
  changeStatus: (task: Task, isChecked: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({ getAllTask, changeStatus }) => {
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
      render: (text, record) => {
        return (
          <Checkbox
            disabled={!!record.subTask.length}
            onChange={(event) => {
              changeStatus(record, event.target.checked);
            }}
            checked={["DONE", "COMPLETE"].includes(text)}
          >
            {"DONE"}
          </Checkbox>
        );
      },
      ellipsis: true,
    },
    {
      title: "Action",
      render: (record) => (
        <Link to={`${ROUTES.UPDATE_TASK.replace(":taskId", record.id)}`}>
          {UI_TEXT.ALL_TASK.TASK.EDIT}
        </Link>
      ),
      ellipsis: true,
    },

    Table.EXPAND_COLUMN,
  ];
  return (
    <Table
      rowKey="id"
      loading={isLoading}
      columns={columns}
      dataSource={task}
      onChange={handleChange}
      expandable={{
        expandedRowRender: (record) => {
          return (
            <SubTaskList
              subTask={[...getSubTask(task, record)]}
              changeStatus={changeStatus}
              parentTaskID={record.id}
            />
          );
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
  );
};

export default TaskList;
