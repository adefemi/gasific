import React from "react";
import { Divider, Table, Tag } from "antd";
import { Card } from "../../components/common/card";
import { Select } from "../../components/common/select";

const columns = [
  {
    title: "Reference",
    dataIndex: "reference",
    key: "reference",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount"
  },
  {
    title: "Date",
    key: "date",
    dataIndex: "date"
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

const data = () => {
  let data1 = [];
  [1, 2, 3, 4].map((item, id) => {
    data1.push({
      key: id,
      reference: "John Brown",
      amount: 32,
      description: "New York No. 1 Lake Park",
      date: ["nice", "developer"]
    });
    return null;
  });

  return data1;
};

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
        <Table dataSource={data()} columns={columns} />
      </Card>
    </div>
  );
}

export default Transactions;
