import ApiForm from "./shared/components/ApiForm";
import ApiResponse from "./shared/components/ApiResponse";
import "./App.scss";
import logo from "./assets/logo.svg";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const [apiResponse, setApiResponse] = useState(null);

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <div className="header-container">
              <img src={logo} alt="logo" width={100} />
              <h2>API Rocket</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <ApiForm setApiResponse={setApiResponse} />
        </Row>
        <Row>
          <Col>
            <ApiResponse response={apiResponse} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
