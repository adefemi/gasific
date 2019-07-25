import React, { useState } from "react";
import { Button, Card, FormGroup, Input } from "../../components/common";
import { Tag } from "antd";
import userAvatar from "../../assets/sub.png";

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
              Edit Info
            </li>
            <li
              className={`${activeTab === 2 && "active"}`}
              onClick={() => setActiveTab(2)}
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
              <ChangePassword />
            </div>
          </div>
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
