import { useState, useEffect } from "react";
import { Input, Row, Col, Button, Card, message } from "antd";
import {
  useGetAllstudentsQuery,
  useUpdateStudentMutation,
} from "../../services/Index";
import { useLocation, useNavigate } from "react-router-dom";

const key = "updatable";

const EditStudent = ({ history, match }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const param_id = location.pathname.split("/");
  const [data, setData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const [updateStudent, { isLoading, isSuccess }] = useUpdateStudentMutation();
  console.log(updateStudent, "updateStudent");

  const { data: studentData } = useGetAllstudentsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.find((el) => el.id == param_id[3]),
    }),
  });
  console.log(data, "data");
  console.log(studentData, "studentData");
  console.log(updateStudent, "updateStudent");
  useEffect(() => {
    if (isLoading) {
      message.loading({ content: "updating student...", key });
    }
    if (isSuccess) {
      message.success({
        content: "student updated successfully",
        key,
        duration: 3,
      });
    }
  }, [isLoading, isSuccess]);

  useEffect(() => {
    if (studentData) {
      setData(studentData);
    }
  }, [studentData]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateStudent(data);
    // after submit data
    setData({
      fullName: "",
      phone: "",
      email: "",
    });

    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card title="Edit a new student">
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Input
              size="large"
              required
              placeholder="Enter Student Full Name"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
            />
          </Col>
          <Col span={24}>
            <Input
              size="large"
              type='number'
              placeholder="Enter Student Phone Number"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              required
            />
          </Col>
          <Col span={24}>
            <Input
              size="large"
              type='email'
              placeholder="Enter Student E-mail address"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </Col>
          <Col span={24}>
            <Button
              htmlType="submit"
              loading={isLoading}
              disabled={
                isLoading || Object.values(data).every((el) => el == "")
              }
              type="primary"
            >
              Update Student
            </Button>
          </Col>
        </Row>
      </Card>
    </form>
  );
};

export default EditStudent;
