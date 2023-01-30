import React from "react";
import Styles from "./App.css";
import RouterComponent from "./utils/router";
// import { Provider } from "react-redux";
// import store from '../store/index';

const App = () => {
  return (
    <div className={Styles.App}>
      {/* <header className="App-header"></header> */}
      {RouterComponent()}
    </div>
  );
};

export default App;
