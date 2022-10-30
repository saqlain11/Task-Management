import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";

const TaskInputs = () => {
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
          style={{ display: "flex", justifyContent: "end" }}
        >
          <Button
            style={{ width: "30%" }}
            htmlType="submit"
            size="middle"
            loading={false}
            type="primary"
          >
            Add task
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskInputs;
