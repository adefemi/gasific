import React from "react";
import { Button, Card } from "../../components/common";
import { NavLink } from "react-router-dom";

function MerchantDashboard(props) {
  return (
    <div>
      <div className="dflex align-center justify-between">
        <div className="dashboard-heading">Merchant Dashboard</div>

        <NavLink to="/dashboard/merchant/new-user">
          <Button variant="outlined" style={{ borderRadius: "40px" }}>
            Create User
          </Button>
        </NavLink>
      </div>
      <br />
      <div className="grid-auto">
        <Card
          heading="Total Users"
          style={{ backgroundColor: "#00b894", color: "#ffffff" }}
        >
          <div className="padding-20 dflex justify-center align-center card-count-container">
            <div style={{ color: "#ffffff" }} className="card-count">
              48
            </div>
          </div>
        </Card>
        <Card
          heading="Total Active Users"
          style={{ backgroundColor: "#e84393", color: "#ffffff" }}
        >
          <div className="padding-20 dflex justify-center align-center card-count-container">
            <div style={{ color: "#ffffff" }} className="card-count">
              13
            </div>
          </div>
        </Card>
        <Card
          heading="Total Revenue (Present Month)"
          style={{ backgroundColor: "#0984e3", color: "#ffffff" }}
        >
          <div className="padding-20 dflex justify-center align-center card-count-container">
            <div style={{ color: "#ffffff" }} className="card-count">
              ₦13,000.00
            </div>
          </div>
        </Card>
        <Card
          heading="Total Revenue (Present Quarter)"
          style={{ backgroundColor: "#a29bfe", color: "#ffffff" }}
        >
          <div className="padding-20 dflex justify-center align-center card-count-container">
            <div style={{ color: "#ffffff" }} className="card-count">
              ₦160,250.00
            </div>
          </div>
        </Card>
        <Card
          heading="Total Revenue (Present Annual)"
          style={{ backgroundColor: "#fd79a8", color: "#ffffff" }}
        >
          <div className="padding-20 dflex justify-center align-center card-count-container">
            <div style={{ color: "#ffffff" }} className="card-count">
              ₦1,138,100.00
            </div>
          </div>
        </Card>
      </div>
      <br />
    </div>
  );
}

export default MerchantDashboard;
