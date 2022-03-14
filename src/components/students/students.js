import { Row, Spin } from "antd";
import { useGetAllstudentsQuery } from "../../services/Index";
import StudentItem from "./item-students";
const Students = () => {
  const { data, isFetching } = useGetAllstudentsQuery();
  return (
    <>
      {isFetching ? (
        <div className="spinner-wrapper">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[20, 20]}>
          {data.map((student) => (
            <StudentItem key={student.id} student={student} />
          ))}
        </Row>
      )}
    </>
  );
};

export default Students;
