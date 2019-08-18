import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Register from "./pages/AuthPage/register";
import Login from "./pages/AuthPage/login";
import ForgotPassword from "./pages/AuthPage/forgotPassword";
import Payment from "./pages/DeliveryPage/delivery";
import Verify from "./pages/VerificationPage/verify";
import Dashboard from "./pages/Dashboard/Dashboard";
import Summary from "./pages/summary/summary";
import DashboardController from "./components/HOC/dashboardHOC";
import AuthController from "./components/HOC/authcontroller";
import ResetPassword from "./pages/AuthPage/resetPassword";
import LoginController from "./components/HOC/logicHOC";
import ChooseMerchant from "./pages/VerificationPage/chooseMerchant";

function Router(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Summary} />
        <Route path="/register" exact component={LoginController(Register)} />
        <Route path="/login" exact component={LoginController(Login)} />
        <Route
          path="/forgot-password"
          exact
          component={LoginController(ForgotPassword)}
        />
        <Route
          path="/reset-password/:token"
          exact
          component={LoginController(ResetPassword)}
        />
        <Route path="/payment" exact component={AuthController(Payment)} />
        <Route path="/verification" exact component={AuthController(Verify)} />
        <Route
          path="/select-merchant"
          exact
          component={AuthController(ChooseMerchant)}
        />
        <Route path="/dashboard" component={AuthController(DashboardMain)} />

        <Route path={"*"} render={() => <h1>Not Found!!!</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

const DashboardMain = () => (
  <DashboardController>
    <Dashboard />
  </DashboardController>
);

export default Router;
