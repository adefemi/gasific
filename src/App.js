import React from "react";
import { ContextProvider } from "./stateManagement/contextProvider";
import "./assets/fonts/adineuePRO/stylesheet.css";
import "./styles/default.css";
import Router from "./router";
import "antd/dist/antd.css";

class App extends React.Component {
  render() {
    return (
      <ContextProvider>
        <Router />
      </ContextProvider>
    );
  }
}

export default App;
