import React, { useState } from "react";
import {
  Button,
  Card,
  FormGroup,
  Input,
  Select
} from "../../components/common";
import { Divider, Table, Tag } from "antd";
import userAvatar from "../../assets/sub.png";

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

function Profile(props) {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div>
      <div className="dashboard-heading">User Profile</div>
      <br />
      <div className="grid-2-u">
        <Card
          heading={
            <div>
              <div className="padding-20 dflex flex-d-v justify-between align-center">
                <div className="img-con">
                  <img src={userAvatar} alt="" />
                </div>
                <p />
                <Tag>Subscription Plan: Monthly</Tag>
              </div>
            </div>
          }
        >
          <div className="padding-20">
            <p>
              <small className="black-text bolder-text">Email Address</small>
              <div>email@email.com</div>
            </p>
            <p>
              <small className="black-text bolder-text">Phone Number</small>
              <div>93030939393</div>
            </p>
            <p>
              <small className="black-text bolder-text">Address</small>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
                beatae corporis ea eius facilis porro quam quis rem sunt velit?
              </div>
            </p>
          </div>
        </Card>
        <Card>
          <div className="tab-heading">
            <li
              className={`${activeTab === 1 && "active"}`}
              onClick={() => setActiveTab(1)}
            >
              Basic Info
            </li>
            <li
              className={`${activeTab === 2 && "active"}`}
              onClick={() => setActiveTab(2)}
            >
              User KYC
            </li>
            <li
              className={`${activeTab === 3 && "active"}`}
              onClick={() => setActiveTab(3)}
            >
              Change Password
            </li>
          </div>
          <div className="tab-content">
            <div
              className={`tab-item ${activeTab === 1 && "active"}`}
              id={"tab-category"}
            >
              <UserInfo />
            </div>
            <div
              className={`tab-item ${activeTab === 2 && "active"}`}
              id={"tab-category"}
            >
              <UserKYC />
            </div>
            <div
              className={`tab-item ${activeTab === 3 && "active"}`}
              id={"tab-category"}
            >
              <ChangePassword />
            </div>
          </div>
        </Card>
      </div>
      <br />
      <br />
      <div>
        {" "}
        <div className="dflex align-center justify-between">
          <div className="dashboard-heading-2">User Activities</div>
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
    </div>
  );
}

const UserInfo = props => {
  return (
    <form action="">
      <div className="grid-2 grid-s-mobile-0">
        <FormGroup title="First Name">
          <Input />
        </FormGroup>
        <FormGroup title="Last Name">
          <Input />
        </FormGroup>
      </div>
      <div className="grid-2 grid-s-mobile-0">
        <FormGroup title="Email Address">
          <Input type="email" />
        </FormGroup>
        <FormGroup title="Phone Number">
          <Input />
        </FormGroup>
      </div>
      <div className="grid-2 grid-s-mobile-0">
        <FormGroup title="Home Address">
          <Input />
        </FormGroup>
        <FormGroup title="State">
          <Input />
        </FormGroup>
      </div>
      <br />
      <Button>Update</Button>
    </form>
  );
};

const UserKYC = props => {
  return (
    <form action="">
      <div className="grid-2 grid-s-mobile-0">
        <FormGroup title="Referral Code">
          <Input />
        </FormGroup>
        <FormGroup title="Gas Cylinder Code">
          <Input />
        </FormGroup>
      </div>
      <div className="grid-2 grid-s-mobile-0">
        <FormGroup title="Family/home size">
          <Input type="email" />
        </FormGroup>
        <FormGroup title="Gas Cylinder Code (Size)">
          <Select>
            <Select.Option value={5}>5kg</Select.Option>
            <Select.Option value={12}>12kg</Select.Option>
            <Select.Option value={25}>25kg</Select.Option>
            <Select.Option value={50}>50kg</Select.Option>
            <Select.Option value={75}>75kg</Select.Option>
            <Select.Option value={100}>100kg</Select.Option>
          </Select>
        </FormGroup>
      </div>
      <br />
      <Button>Update</Button>
    </form>
  );
};

const ChangePassword = props => {
  return (
    <form action="">
      <div className="max-width-600">
        <FormGroup title="Old Password">
          <Input type="password" />
        </FormGroup>
        <FormGroup title="New Password">
          <Input type="password" />
        </FormGroup>
        <FormGroup title="Confirm Password">
          <Input type="password" />
        </FormGroup>

        <br />
        <Button>Update</Button>
      </div>
    </form>
  );
};

export default Profile;
