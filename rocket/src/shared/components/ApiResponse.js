// ApiResponse.js
import React from "react";

const ApiResponse = ({ response }) => {
  return (
    <div className="api-response">
      <h5>API Response</h5>
      <br />
      {response ? (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      ) : (
        <p>No response yet. Make a request.</p>
      )}
    </div>
  );
};

export default ApiResponse;
