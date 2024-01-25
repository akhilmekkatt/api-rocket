import ApiForm from "./shared/components/ApiForm";
import ApiResponse from "./shared/components/ApiResponse";
import "./App.css";
import logo from "./assets/logo.svg";
import React, { useState } from "react";

function App() {
  const [apiResponse, setApiResponse] = useState(null);

  return (
    <div className="App">
      <img src={logo} alt="logo" width={100} />
      <ApiForm setApiResponse={setApiResponse} />
      <ApiResponse response={apiResponse} />
    </div>
  );
}

export default App;
