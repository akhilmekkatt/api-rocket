// ApiForm.js
import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Row, Button } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const ApiForm = ({ setApiResponse }) => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [headers, setHeaders] = useState([]);

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleHeaderChange = (index, keyOrValue, e) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][keyOrValue] = e.target.value;
    setHeaders(updatedHeaders);
  };

  const handleAddHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const handleRemoveHeader = (index) => {
    const updatedHeaders = [...headers];
    updatedHeaders.splice(index, 1);
    setHeaders(updatedHeaders);
  };

  const handleSendRequest = async () => {
    try {
      const requestConfig = {
        method,
        url,
        data: method === "POST" ? JSON.parse(body) : undefined,
        headers: Object.fromEntries(
          headers.map(({ key, value }) => [key, value])
        ),
      };

      const response = await axios(requestConfig);
      setApiResponse(response.data);
    } catch (error) {
      setApiResponse({ error: error.message });
    }
  };

  return (
    <div className="api-form">
      <Row className="mb-3">
        <InputGroup className="url-form">
          <Form.Select
            size="md"
            className="w-5"
            placeholder="Method"
            aria-label="Default select example"
            id="basic-addon1"
            value={method}
            onChange={handleMethodChange}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </Form.Select>
          <Form.Control
            size="md"
            className="w-50"
            aria-label="Username"
            aria-describedby="basic-addon1"
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Enter URL"
          />
          <Button size="md" variant="primary" onClick={handleSendRequest}>
            Send
          </Button>
        </InputGroup>
      </Row>

      <Tabs
        defaultActiveKey="headers"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="headers" title="Headers">
          {headers.map((header, index) => (
            <InputGroup key={index} className="mb-1">
              <Form.Control
                size="sm"
                value={header.key}
                aria-label="Key"
                aria-describedby="basic-addon1"
                type="text"
                onChange={(e) => handleHeaderChange(index, "key", e)}
                placeholder="Key"
              />
              <Form.Control
                size="sm"
                aria-label="Key"
                aria-describedby="basic-addon1"
                type="text"
                value={header.value}
                onChange={(e) => handleHeaderChange(index, "value", e)}
                placeholder="Value"
              />
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() => handleRemoveHeader(index)}
              >
                Remove
              </Button>
            </InputGroup>
          ))}
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={handleAddHeader}
          >
            Add Header
          </Button>
        </Tab>
        <Tab eventKey="body" title="Body">
          {method === "POST" && (
            <Form.Control
              as="textarea"
              rows={3}
              value={body}
              onChange={handleBodyChange}
              placeholder="Enter JSON body"
            />
          )}
        </Tab>
        <Tab eventKey="contact" title="Authorization" disabled>
          Tab content for Contact
        </Tab>
      </Tabs>
    </div>
  );
};

export default ApiForm;
