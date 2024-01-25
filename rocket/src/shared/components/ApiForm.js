// ApiForm.js
import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <label>
        Method:
        <select value={method} onChange={handleMethodChange}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
      <br />
      <label>
        URL:
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter URL"
        />
      </label>
      <br />
      {method === "POST" && (
        <div>
          <label>
            Request Body:
            <textarea
              value={body}
              onChange={handleBodyChange}
              placeholder="Enter JSON body"
            />
          </label>
          <br />
        </div>
      )}
      <div>
        <h4>Headers:</h4>
        {headers.map((header, index) => (
          <div key={index}>
            <label>
              Key:
              <input
                type="text"
                value={header.key}
                onChange={(e) => handleHeaderChange(index, "key", e)}
                placeholder="Header Key"
              />
            </label>
            <label>
              Value:
              <input
                type="text"
                value={header.value}
                onChange={(e) => handleHeaderChange(index, "value", e)}
                placeholder="Header Value"
              />
            </label>
            <button onClick={() => handleRemoveHeader(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddHeader}>Add Header</button>
      </div>
      <br />
      <button onClick={handleSendRequest}>Send Request</button>
    </div>
  );
};

export default ApiForm;
