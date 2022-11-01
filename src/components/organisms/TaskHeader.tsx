import React from "react";
import { Button, Col, Row, Typography } from "antd";
import { UI_TEXT } from "helpers/constants";
import { useNavigate } from "react-router-dom";
interface TaskHeaderProps {
  buttonTitle: string;
  url: string;
}
const { Title } = Typography;

const TaskHeader: React.FC<TaskHeaderProps> = ({ buttonTitle, url }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(url);
  };
  return (
    <Row align="middle">
      <Col span={12}>
        <Title level={2}>{UI_TEXT.COMMON.Task_MANAGEMENT_SYSTEM}</Title>
      </Col>
      <Col style={{ display: "flex", justifyContent: "end" }} span={12}>
        <Button onClick={handleClick} size="middle" type="primary">
          {buttonTitle}
        </Button>
      </Col>
    </Row>
  );
};

export default TaskHeader;
