import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Register from "./pages/AuthPage/register";
import Login from "./pages/AuthPage/login";
import Test from "./pages/testPage";
import ForgotPassword from "./pages/AuthPage/forgotPassword";
import Delivery from "./pages/DeliveryPage/delivery";
import Verify from "./pages/VerificationPage/verify";
import Dashboard from "./pages/Dashboard/Dashboard";

function Router(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Test} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route path="/delivery" exact component={Delivery} />
        <Route path="/verification" exact component={Verify} />
        <Dashboard />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
