import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  FormGroup,
  Input,
  Select,
  Notification,
  Spinner
} from "../../components/common";
import { Badge, Tag } from "antd";
import userAvatar from "../../assets/sub.png";
import {
  axiosFunc,
  errorHandler,
  getAllStates
} from "../../components/utils/helper";
import { UserUrl } from "../../components/utils/api";
import { MainContext } from "../../stateManagement/contextProvider";

function Profile(props) {
  const [activeTab, setActiveTab] = useState(1);
  const [userInfoMain, setUserInfoMain] = useState({});
  const [fetching, setFetching] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { state } = useContext(MainContext);

  const onGetUserInfo = (status, data) => {
    if (status) {
      let meta = {};
      let data1 = data.data.data.user;
      for (let i = 0; i < data1.meta.length; i++) {
        meta[data1.meta[i].meta_key] = data1.meta[i].meta_value;
      }
      setUserInfoMain({ ...data1, meta });
      setFetching(false);
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(data)
      });
    }
  };

  useEffect(() => {
    axiosFunc("get", UserUrl(), null, "yes", onGetUserInfo);
    console.log(state);
  }, [state]);

  const onChange = e => {
    setUserInfoMain({
      ...userInfoMain,
      [e.target.name]: e.target.value
    });
  };

  const onMetaChange = e => {
    let meta = {};
    if (userInfoMain.meta) {
      meta = userInfoMain.meta;
    }
    meta[e.target.name] = e.target.value;
    setUserInfoMain({
      ...userInfoMain,
      meta
    });
  };

  const onUpdateComplete = (status, data) => {
    setUpdating(false);
    if (status) {
      Notification.bubble({
        type: "success",
        content: "Profile Updated"
      });
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(data)
      });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    setUpdating(true);
    axiosFunc("post", UserUrl(), userInfoMain, "yes", onUpdateComplete);
  };

  return (
    <div>
      <div className="dashboard-heading">User Profile</div>
      <br />
      <div className="grid-2-u">
        <div>
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
            {fetching ? (
              <div className="padding-20">
                <Spinner color="#999999" />
              </div>
            ) : (
              <div className="padding-20">
                {userInfoMain.email && (
                  <p>
                    <small className="black-text bolder-text">
                      Email Address
                    </small>
                    <br />
                    <span>{userInfoMain.email}</span>
                  </p>
                )}

                {userInfoMain.phone && (
                  <p>
                    <small className="black-text bolder-text">
                      Phone Number
                    </small>
                    <br />
                    <span>{userInfoMain.phone}</span>
                  </p>
                )}
                {userInfoMain.address && (
                  <p>
                    <small className="black-text bolder-text">Address</small>
                    <br />
                    <span>{userInfoMain.address}</span>
                  </p>
                )}

                {state.hardware && (
                  <>
                    <div className="divider" />
                    <br />
                    <h4>Hardware Information</h4>
                    <br />
                    <p>
                      <small className="black-text bolder-text">
                        IMEI: {state.hardware.hardwareData.imei}
                      </small>
                    </p>
                    <p>
                      <small className="black-text bolder-text">
                        Model: {state.hardware.hardwareData.model}
                      </small>
                    </p>
                    <div>
                      <small className="black-text bolder-text">
                        Status:{" "}
                        {state.hardware.hardwareData.status === 1 ? (
                          <Tag color="green">True</Tag>
                        ) : (
                          <Tag color="orange">False</Tag>
                        )}
                      </small>
                    </div>
                    <p>
                      <small className="black-text bolder-text">
                        DESC: {state.hardware.hardwareData.desc}
                      </small>
                    </p>
                  </>
                )}
              </div>
            )}
          </Card>
        </div>
        <div>
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
                {fetching ? (
                  <Spinner color="#999" />
                ) : (
                  <UserInfo
                    onChange={onChange}
                    state={userInfoMain}
                    onSubmit={onSubmit}
                    updating={updating}
                  />
                )}
              </div>
              <div
                className={`tab-item ${activeTab === 2 && "active"}`}
                id={"tab-category"}
              >
                {fetching ? (
                  <Spinner color="#999" />
                ) : (
                  <UserKYC
                    state={userInfoMain.meta || {}}
                    onChange={onMetaChange}
                    onSubmit={onSubmit}
                    updating={updating}
                  />
                )}
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
      </div>
      <br />
      <br />
    </div>
  );
}

const UserInfo = props => {
  const { state, onChange, onSubmit, updating } = props;
  return (
    <form onSubmit={onSubmit}>
      <div>
        <FormGroup title="Name">
          <Input
            name="name"
            value={state.name || ""}
            required
            onChange={onChange}
          />
        </FormGroup>
      </div>
      <div className="grid-2 grid-s-mobile-0">
        <FormGroup title="Email Address">
          <Input
            type="email"
            name="email"
            value={state.email || ""}
            required
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup title="Phone Number">
          <Input
            type="number"
            name="phone"
            value={state.phone || ""}
            required
            onChange={onChange}
          />
        </FormGroup>
      </div>
      <div className="grid-2 grid-s-mobile-0">
        <FormGroup title="Home Address">
          <Input
            name="address"
            value={state.address || ""}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup title="State">
          <Select name="state" value={state.state || ""} onChange={onChange}>
            {getAllStates("nigeria", true).map((item, id) => (
              <Select.Option key={id} value={item.value}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </FormGroup>
      </div>
      <br />
      <Button type="submit" loading={updating} disabled={updating}>
        Update
      </Button>
    </form>
  );
};

const UserKYC = props => {
  const { state, onChange, onSubmit, updating } = props;
  return (
    <form onSubmit={onSubmit}>
      <div className="grid-auto">
        <FormGroup title="Referral Code">
          <Input
            name="referral_code"
            value={state.referral_code || ""}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup title="Family/home size">
          <Input
            name="home_size"
            value={state.home_size || ""}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup title="Gas Cylinder Code (Size)">
          <Select
            name="cylinder_code"
            value={state.cylinder_code}
            onChange={onChange}
          >
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
      <Button type="submit" loading={updating} disabled={updating}>
        Update
      </Button>
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
