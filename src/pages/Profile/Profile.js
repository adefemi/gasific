import React, { useContext, useEffect, useState } from "react";
import { Card, Notification, Spinner, DropDown } from "../../components/common";
import { Tag } from "antd";
import userAvatar from "../../assets/sub.png";
import { axiosFunc, errorHandler } from "../../components/utils/helper";
import {
  hardwareUrl,
  subscriptionUrl,
  UserUrl
} from "../../components/utils/api";
import { MainContext } from "../../stateManagement/contextProvider";
import UserInfo from "./components/userInfo";
import UserKYC from "./components/userKYC";
import ChangePassword from "./components/changePassword";
import HardwareInfo from "./components/hardwareInfo";
import UserBilling from "./components/userBilling";
import UserMerchant from "./components/userMerchant";
import { formatPlans, getPlans } from "../summary/summary";
import { USERDATA } from "../../components/utils/data";

function Profile(props) {
  const [activeTab, setActiveTab] = useState(1);
  const [userInfoMain, setUserInfoMain] = useState({});
  const [hardware, setHardware] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [plans, setPlans] = useState({
    data: [],
    fetching: true
  });
  const {
    state: { user }
  } = useContext(MainContext);
  const [activePlan, setActivePlan] = useState(null);

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

  const getHardWare = () => {
    axiosFunc("get", hardwareUrl(), null, "yes", (status, data) => {
      if (status) {
        console.log(data.data.data.user_hardware.hardware);
        setHardware(data.data.data.user_hardware.hardware);
      } else {
        Notification.bubble({
          type: "error",
          content: errorHandler(data)
        });
      }
    });
  };

  const onGetPlans = (status, payload) => {
    if (status) {
      console.log(payload.data.data);
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(payload)
      });
    }
  };

  useEffect(() => {
    axiosFunc(
      "get",
      subscriptionUrl("?status=active"),
      null,
      "yes",
      onGetPlans
    );
    getHardWare();
    axiosFunc("get", UserUrl(), null, "yes", onGetUserInfo);
  }, []);

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
                  <div className="img-con profile-image">
                    <img src={userAvatar} alt="" />
                  </div>
                  <small className="text-center link-btn">
                    Change profile picture
                  </small>
                  <p />
                  {!plans.fetching && (
                    <Tag className="user-profile-tag">
                      {console.log(activePlan)}
                      <DropDown
                        dropDownWidth={"200px"}
                        onChange={() => null}
                        active={activePlan}
                        options={formatPlans(plans.data)}
                      />
                    </Tag>
                  )}
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
              </div>
            )}
          </Card>
          <br />
          <Card round heading="Hardware Information">
            {fetching ? (
              <div className="padding-20">
                <Spinner color="#999999" />
              </div>
            ) : (
              hardware && <HardwareInfo state={hardware} />
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
              <li
                className={`${activeTab === 4 && "active"}`}
                onClick={() => setActiveTab(4)}
              >
                Billing
              </li>
              <li
                className={`${activeTab === 5 && "active"}`}
                onClick={() => setActiveTab(5)}
              >
                Merchant
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
                    onMetaChange={onMetaChange}
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
              <div
                className={`tab-item ${activeTab === 4 && "active"}`}
                id={"tab-category"}
              >
                <UserBilling />
              </div>
              <div
                className={`tab-item ${activeTab === 5 && "active"}`}
                id={"tab-category"}
              >
                <UserMerchant />
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

export default Profile;
