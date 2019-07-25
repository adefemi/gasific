import React from "react";
import { ContextProvider } from "./stateManagement/contextProvider";
import "./styles/default.css";
import Router from "./router";



class App extends React.Component{
  render(){
  return (
    <ContextProvider>
      <Router />
    </ContextProvider>
  );
}}

export default App;
