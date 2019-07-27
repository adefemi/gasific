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
import { Divider, Table, Tag } from "antd";

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

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a href="javascript:;">Invite {record.name}</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    )
  }
];

const dataSource = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];

function UserDashboard(props) {
  return (
    <div>
      <div className="dashboard-heading">User Dashboard</div>
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
          </div>
        </Card>
      </div>
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
      <div className="dashboard-heading-2">Recent Gas Usage Logs</div>
      <p />
      <Card>
        <Table dataSource={dataSource} columns={columns} />
      </Card>
    </div>
  );
}

export default UserDashboard;
