import React from "react";
import { Row, Col, Card, Image, Descriptions, Spin } from "antd";
import { useGetAllstudentsQuery } from "../../services/Index";
import { useLocation } from "react-router-dom";
const Student = () => {
  const location = useLocation();
  const param_id = location.pathname.split("/");
  const { data } = useGetAllstudentsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.find((item) => item.id == param_id[2]),
    }),
  });
  return (
    <div>
      {data == undefined ? (
        <div className="spinner-wrapper">
          <Spin size="large" />
        </div>
      ) : (
        <Card title="View Student Detials">
          <Row gutter={[0, 20]}>
            <Col span={8}>
              <Image
                width={200}
                src={`https://i.pravatar.cc/300?img=${data?.id}`}
              />
            </Col>
            <Col span={16}>
              <Descriptions title={data?.fullName} layout="vertical">
                <Descriptions.Item label="full name">
                  {data?.fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Phone Number">
                  {data?.phone}
                </Descriptions.Item>
                <Descriptions.Item label="E-mail Address">
                  {data?.email}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default Student;
