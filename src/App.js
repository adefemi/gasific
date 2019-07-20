import React from "react";
import { ContextProvider } from "./stateManagement/contextProvider";
import "./styles/default.css";
import Router from "./router";

function App() {
  return (
    <ContextProvider>
      <Router />
    </ContextProvider>
  );
}

export default App;
