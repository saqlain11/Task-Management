import { Button, Col, Form, Input, Row, Select } from "antd";
import { UI_TEXT } from "helpers/constants";
import React from "react";

const TaskForm: React.FC = () => {
  const REQUIRED = "${label} is required!";
  const { Option } = Select;
  return (
    <Form layout="vertical">
      <Row gutter={16} style={{ padding: "10px" }}>
        <Col span={12} md={12} sm={24}>
          <Form.Item
            name="taskName"
            required
            rules={[{ required: true, message: REQUIRED }]}
            label="Task Name"
          >
            <Input maxLength={30} />
          </Form.Item>
        </Col>
        <Col span={12} md={12} sm={24}>
          <Form.Item
            name="description"
            rules={[{ required: true, message: REQUIRED }]}
            required
            label="Description"
          >
            <Input maxLength={50} />
          </Form.Item>
        </Col>
        <Col span={12} md={12} sm={24}>
          <Form.Item name="parentTask" label="Parent Task">
            <Select>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col
          span={12}
          md={12}
          sm={24}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Button
            style={{ width: "30%" }}
            htmlType="submit"
            size="middle"
            loading={false}
            type="primary"
          >
            {UI_TEXT.CREATE_TASK.CTA.ADD_TASK}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskForm;
