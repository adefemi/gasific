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

function Dashboard(props) {
  return (
    <DashboardMain {...props}>
      <Route exact path={"/dashboard/merchant"} component={MerchantDashboard} />
      <Route exact path={"/dashboard/user"} component={UserDashboard} />
      <Route exact path={"/dashboard/transactions"} component={Transactions} />
      <Route exact path={"/dashboard/profile"} component={Profile} />
      <Route exact path={"/dashboard/gas-usage"} component={GasUsage} />
      <Route exact path={"/dashboard/help/FAQ"} component={Faq} />
      <Route exact path={"/dashboard/help"} component={Help} />
    </DashboardMain>
  );
}

export default Dashboard;
