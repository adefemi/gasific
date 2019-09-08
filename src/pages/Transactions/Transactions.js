import React, { useEffect, useState } from "react";
import { Pagination, Table, Tag } from "antd";
import { Card } from "../../components/common/card";
import { Select } from "../../components/common/select";
import { axiosFunc, errorHandler, goTop } from "../../components/utils/helper";
import { transactionUrl } from "../../components/utils/api";
import moment from "moment";

const columns = [
  {
    title: "Reference",
    dataIndex: "reference",
    key: "reference",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Created at",
    dataIndex: "created_at",
    key: "created_at"
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount"
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status"
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action"
  }
];

const data = payload => {
  let data1 = [];
  payload.map((item, id) => {
    data1.push({
      key: id,
      reference: item.reference,
      amount: <span>₦ {parseFloat(item.amount).toFixed(2)}</span>,
      status: (
        <Tag
          color={
            item.status === "pending"
              ? "orange"
              : item.status === "success"
              ? "green"
              : "red"
          }
        >
          {item.status}
        </Tag>
      ),
      created_at: moment(new Date(item.created_at)).format("MM-DD-YYYY"),
      action: <a href="#">View</a>
    });
    return null;
  });

  return data1;
};

function Transactions(props) {
  const [transactions, setTransactions] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getTransaction(1);
  }, []);

  const getTransaction = page => {
    setFetching(true);
    axiosFunc(
      "get",
      transactionUrl(`?page=${page}`),
      null,
      "yes",
      (status, data) => {
        if (status) {
          setTransactions(data.data.data.transactions);
          setFetching(false);
          goTop();
        } else {
          Notification.bubble({
            type: "error",
            content: errorHandler(data)
          });
        }
      }
    );
  };

  const changePage = page => {
    getTransaction(page);
  };

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
        <Table
          loading={fetching}
          dataSource={transactions.data && data(transactions.data)}
          columns={columns}
          pagination={false}
        />
        <br />
        <div className="dflex align-center justify-between">
          <div />
          <Pagination
            current={!fetching ? transactions.current_page : 0}
            total={!fetching ? transactions.total : 0}
            onChange={changePage}
          />
        </div>
        <br />
      </Card>
    </div>
  );
}

export default Transactions;
