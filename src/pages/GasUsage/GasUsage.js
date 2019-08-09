import React from "react";
import { Divider, Table, Tag } from "antd";
import { Card } from "../../components/common/card";

const columns = [
  {
    title: "Date-Time",
    dataIndex: "dateTime",
    key: "dateTime",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Gas Used",
    dataIndex: "gasUsed",
    key: "gasUsed"
  },
  {
    title: "Remaining",
    dataIndex: "remaining",
    key: "remaining"
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
      dateTime: "12/04/2019 - 10:18",
      gasUsed: 32,
      remaining: 25
    });
    return null;
  });

  return data1;
};

function GasUsage(props) {
  return (
    <div>
      {" "}
      <div className="dashboard-heading">Gas Usage Log</div>
      <br />
      <Card>
        <Table dataSource={data()} columns={columns} />
      </Card>
    </div>
  );
}

export default GasUsage;
