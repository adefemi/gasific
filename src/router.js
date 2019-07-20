import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Register from "./pages/AuthPage/register";
import Login from "./pages/AuthPage/login";
import Test from "./pages/testPage";

function Router(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Test} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;