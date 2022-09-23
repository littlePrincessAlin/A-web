import React, { useEffect } from "react";
import "./App.css";
import RouterComponent from "./utils/router";

const App = () => {
  useEffect(() => {}, []);
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      {RouterComponent()}
    </div>
  );
};

export default App;
