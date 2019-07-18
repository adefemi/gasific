import React from "react";
import { ContextProvider } from "./stateManagement/contextProvider";
import Test from "./pages/testPage";
import "./styles/default.css";

function App() {
  return (
    <ContextProvider>
      <Test />
    </ContextProvider>
  );
}

export default App;
