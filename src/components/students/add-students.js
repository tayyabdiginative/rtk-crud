import { useState, useEffect } from "react";
import { Input, Row, Col, Button, Card, message } from "antd";
import { useAddStudentMutation } from "../../services/Index";
import { useNavigate } from "react-router-dom";
const KEY = "ADD_STUDENT";

const AddStudent = () => {
  console.log(useAddStudentMutation(), "useAddStudentMutation");
  const [addStudent, { isLoading, isSuccess }] = useAddStudentMutation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent(data);

    setData({
      fullName: "",
      phone: "",
      email: "",
    });

    navigate("/");
  };

  useEffect(() => {
    if (isLoading) {
      message.loading({ content: "createing student...", KEY });
    }
    if (isSuccess) {
      message.success({
        content: "student created successfully",
        KEY,
        duration: 3,
      });
    }
  }, [isLoading, isSuccess]);
  return (
    <form onSubmit={handleSubmit}>
      <Card title="Create a new student">
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Input
              size="large"
              type='text'
              placeholder="Enter Student Full Name"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </Col>
          <Col span={24}>
            <Input
              size="large"
              placeholder="Enter Student Phone Number"
              name="phone"
              type='number'
              value={data.phone}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </Col>
          <Col span={24}>
            <Input
              size="large"
              placeholder="Enter Student E-mail address"
              name="email"
              value={data.email}
              type='email'
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </Col>
          <Col span={24}>
            <Button loading={isLoading} htmlType="submit" type="primary">
              Add Student
            </Button>
          </Col>
        </Row>
      </Card>
    </form>
  );
};

export default AddStudent;
