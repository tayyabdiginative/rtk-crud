import "antd/dist/antd.css";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Link,
} from "react-router-dom";
import Students from "./components/students/students";
import AddStudent from "./components/students/add-students";
import EditStudent from "./components/students/edit-students";
import Student from "./components/students/student";
const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout-wrapper">
        <Header
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Link className="ant-btn" to="/students/add">
            Add Student
          </Link>
        </Header>
        <Content className="content-wrapper" style={{ padding: "20px 50px" }}>
          <Routes>
            <Route exact path="/" element={<Students />} />
            <Route exact path="/students/add" element={<AddStudent/>} />
            <Route exact path="/students/:id" element={<Student/>} />
            <Route exact path="/students/edit/:id" element={<EditStudent/>} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
