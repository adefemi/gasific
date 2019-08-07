import React from "react";
import { Card } from "../../components/common";
import gasUsage from "../../assets/gas-usage.png";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

function UserDashboard(props) {
  return (
    <div>
      <div className="dashboard-heading">User Dashboard</div>
      <br />
      <div className="grid-3">
        <Card className="card-style-1" style={{ backgroundColor: "#0984e3" }}>
          <div className="left">
            <div className="main">0.8 KG</div>
            <small>TODAY, Cooking Gas Usage</small>
          </div>
          <div className="right">
            <div className="main">Monday</div>
            <small>April 14</small>
          </div>
        </Card>
        <Card className="card-style-1" style={{ backgroundColor: "#6c5ce7" }}>
          <div className="left">
            <div className="main">11.1 KG</div>
            <small>WEEKLY, Cooking Gas Usage</small>
          </div>
          <div className="right">
            <div className="main">Week 5</div>
            <small>April 14</small>
          </div>
        </Card>
        <Card className="card-style-1" style={{ backgroundColor: "#e17055" }}>
          <div className="left">
            <div className="main">214.3 KG</div>
            <small>MONTHLY, Cooking Gas Usage</small>
          </div>
          <div className="right">
            <div className="main">Month 1</div>
            <small>April 14</small>
          </div>
        </Card>
      </div>

      <br />
      <br />
      <div className="grid-2-v">
        <Card heading="Usage(in grams)/Time(h)">
          <div
            className="padding-20"
            style={{ width: "100%", height: "400px" }}
          >
            <ResponsiveContainer>
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card heading="Gas Gauge">
          <div className="padding-20 dflex justify-center align-center">
            <img src={gasUsage} height="100%" />
            <div className="guage-percentage">50%</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default UserDashboard;
