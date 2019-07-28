import React from "react";
import { Button, Card } from "../../components/common";
import { Table, Divider, Tag } from "antd";
import { NavLink } from "react-router-dom";

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

const data = [
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

function MerchantDashboard(props) {
  return (
    <div>
      <div className="dflex align-center justify-between">
        <div className="dashboard-heading">Merchant Dashboard</div>

        <NavLink to="/register">
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
      <br />
      <div className="dashboard-heading-2">Recent Users</div>
      <br />
      <Card>
        <Table dataSource={data} columns={columns} />
      </Card>
      <br />
      <br />
      <div className="dashboard-heading-2">Recent Transactions</div>
      <br />
      <Card>
        <Table dataSource={data} columns={columns} />
      </Card>
    </div>
  );
}

export default MerchantDashboard;
