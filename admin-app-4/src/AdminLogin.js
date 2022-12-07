import { Container, Row, Col } from "react-bootstrap";
import {Routes, Route} from "react-router-dom";
import "./AdminLogin.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Container style={{ width: "400px" }}>
      <Row>
        <Col>
            <Routes>
                <Route index={true} element={<Login />} />

                <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/Signup" element={<Signup />} />
            </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
