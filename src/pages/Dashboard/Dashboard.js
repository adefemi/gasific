import React from "react";
import DashboardMain from "../../components/layouts/DashboardLayout/DashboardMain";
import { Route } from "react-router-dom";
import MerchantDashboard from "../Merchant/MerchantDashboard";
import UserDashboard from "../User/UserDashboard";
import Transactions from "../Transactions/Transactions";
import Profile from "../Profile/Profile";
import GasUsage from "../GasUsage/GasUsage";
import Faq from "../FAQ/FAQ";
import Help from "../Help/Help";
import UserAuthController from "../../components/HOC/userAuthController";

function Dashboard(props) {
  return (
    <DashboardMain {...props}>
      <Route exact path={"/dashboard/merchant"} component={MerchantDashboard} />
      <Route
        exact
        path={"/dashboard/user"}
        component={UserAuthController(UserDashboard)}
      />
      <Route
        exact
        path={"/dashboard/transactions"}
        component={UserAuthController(Transactions)}
      />
      <Route
        exact
        path={"/dashboard/profile"}
        component={UserAuthController(Profile)}
      />
      <Route
        exact
        path={"/dashboard/gas-usage"}
        component={UserAuthController(GasUsage)}
      />
      <Route
        exact
        path={"/dashboard/help/FAQ"}
        component={UserAuthController(Faq)}
      />
      <Route
        exact
        path={"/dashboard/help"}
        component={UserAuthController(Help)}
      />
    </DashboardMain>
  );
}

export default Dashboard;
