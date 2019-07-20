import React from "react";
import { ContextProvider } from "./stateManagement/contextProvider";
import Test from "./pages/testPage";
import "./styles/default.css";
import { Route, Router, Switch, withRouter, browserHistory, IndexRoute} from "react-router-dom"
import Summary from "./pages/summary"

const Home = () =>{

}
   
//   return (
//     
//   )}



class App extends React.Component{
  render(){
  return (
<ContextProvider>
    <Summary/>
    {/* <Test /> */}
</ContextProvider>
  );}
}

export default App;
