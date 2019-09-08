import React from "react";
import { Divider, Table, Tag } from "antd";
import { Card } from "../../components/common/card";

const columns = [
  {
    title: "Start Time",
    dataIndex: "startTime",
    key: "startTime",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "End Time",
    dataIndex: "endTime",
    key: "endTime",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Usage Duration",
    dataIndex: "usageDuration",
    key: "usageDuration",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: (
      <span>
        Volume Used{" "}
        <sup>
          (cm<sup>3</sup>)
        </sup>
      </span>
    ),
    dataIndex: "volumeUsed",
    key: "volumeUsed"
  },
  {
    title: (
      <span>
        Volume Remaining{" "}
        <sup>
          (cm<sup>3</sup>)
        </sup>
      </span>
    ),
    dataIndex: "volumeRemaining",
    key: "volumeRemaining"
  }
];

const data = () => {
  let data1 = [];
  [1, 2, 3, 4, 1, 1, 1, 1, 1].map((item, id) => {
    data1.push({
      key: id,
      startTime: "12/04/2019 - 10:18",
      endTime: "12/04/2019 - 10:18",
      usageDuration: "12/04/2019 to 12/04/2019 ",
      volumeUsed: 32.25,
      volumeRemaining: 25.25
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
