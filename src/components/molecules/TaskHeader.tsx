import React from "react";
import { Button, Col, Row, Typography } from "antd";

const TaskHeader: React.FC = () => {
  const { Title } = Typography;
  return (
    <Row style={{ padding: "10px" }}>
      <Col span={12}>
        <Title level={1}>Task Management System</Title>
      </Col>
      <Col span={12}>
        <Button style={{ width: "30%" }} type="primary">
          Add New Task
        </Button>
      </Col>
    </Row>
  );
};

export default TaskHeader;
