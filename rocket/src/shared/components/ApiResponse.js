// ApiResponse.js
import React from "react";

const ApiResponse = ({ response }) => {
  return (
    <div>
      <h2>API Response</h2>
      {response ? (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      ) : (
        <p>No response yet. Make a request.</p>
      )}
    </div>
  );
};

export default ApiResponse;
