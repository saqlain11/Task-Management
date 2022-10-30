import React from "react";
import { Button, Col, Row, Typography } from "antd";
import { UI_TEXT } from "helpers/constants";
interface TaskHeaderProps {
  buttonTitle: string;
  url: string;
}
const TaskHeader: React.FC<TaskHeaderProps> = ({ buttonTitle, url }) => {
  const { Title } = Typography;
  return (
    <Row align="middle" style={{ padding: "10px" }}>
      <Col span={12}>
        <Title level={2}>{UI_TEXT.COMMON.Task_MANAGEMENT_SYSTEM}</Title>
      </Col>
      <Col style={{ display: "flex", justifyContent: "end" }} span={12}>
        <Button size="middle" type="primary">
          {buttonTitle}
        </Button>
      </Col>
    </Row>
  );
};

export default TaskHeader;
