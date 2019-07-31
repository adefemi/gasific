import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Register from "./pages/AuthPage/register";
import Login from "./pages/AuthPage/login";
import Test from "./pages/testPage";
import ForgotPassword from "./pages/AuthPage/forgotPassword";
import Delivery from "./pages/DeliveryPage/delivery";
import Verify from "./pages/VerificationPage/verify";
import Dashboard from "./pages/Dashboard/Dashboard";
import Summary from "./pages/summary/summary";
import DashboardController from "./components/HOC/dashboardHOC";
import AuthController from "./components/HOC/authcontroller";

function Router(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Summary} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route path="/delivery" exact component={AuthController(Delivery)} />
        <Route path="/verification" exact component={AuthController(Verify)} />

        <DashboardController>
          <Dashboard />
        </DashboardController>
        <Route path={"*"} render={() => <h1>Not Found!!!</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
