import React from "react";
import { Divider, Table, Tag } from "antd";
import { Card } from "../../components/common/card";
import { Select } from "../../components/common/select";

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

function Transactions(props) {
  return (
    <div>
      {" "}
      <div className="dflex align-center justify-between">
        <div className="dashboard-heading">Transactions</div>
        <Select style={{ width: "250px" }}>
          <Select.Option value="All">All</Select.Option>
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Failed">Failed</Select.Option>
          <Select.Option value="Success">Success</Select.Option>
        </Select>
      </div>
      <br />
      <Card>
        <Table dataSource={data} columns={columns} />
      </Card>
    </div>
  );
}

export default Transactions;
