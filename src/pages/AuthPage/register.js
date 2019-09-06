import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import {
  FormGroup,
  Input,
  Button,
  Notification,
  Select
} from "../../components/common";
import { NavLink } from "react-router-dom";
import {
  axiosFunc,
  errorHandler,
  getAllStates
} from "../../components/utils/helper";
import { authUrl } from "../../components/utils/api";
import { Radio } from "antd";
import BusinessInfo from "./businessInfo";
import BasicInfo from "./basicInfo";

function Register(props) {
  const [submit, setSubmit] = useState(false);
  const [registerData, setRegisterData] = useState({});
  const [merchantData, setmerchantData] = useState({});
  const [activePage, setActivePage] = useState(1);

  const onChange = e => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const onChangeBusiness = e => {
    setmerchantData({
      ...merchantData,
      [e.target.name]: e.target.value
    });
  };

  const onRegister = (status, payload) => {
    setSubmit(false);

    if (status) {
      Notification.bubble({
        type: "success",
        content: "Registration Successful"
      });
      setRegisterData({});
      setSubmit(false);
      props.history.push("/login");
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(payload)
      });
    }
  };

  const register = e => {
    e.preventDefault();

    if (registerData.password !== registerData.cpassword) {
      Notification.bubble({
        type: "error",
        content: "Password do not match!"
      });
      setSubmit(false);
      return;
    }

    let data = {
      email: registerData.email,
      password: registerData.password,
      name: `${registerData.firstName} ${registerData.lastName}`,
      plan_id: localStorage.getItem("gas_plan"),
      callback_url: "http://web.gasific.ng",
      phone: registerData.phone,
      role: registerData.role || "customer"
    };

    if (data.role === "merchant" && activePage === 1) {
      setActivePage(2);
      return;
    } else if (data.role === "merchant" && activePage === 2) {
      data.meta = merchantData;
    }

    setSubmit(true);

    axiosFunc("post", authUrl("register"), data, null, onRegister);
  };

  return (
    <AuthLayout>
      <div className="dflex align-center justify-between">
        <div className="heading primary-text">
          Hi, Set up your Gasific account!
        </div>

        {activePage === 2 && (
          <div
            className="link-btn"
            onClick={() => setActivePage(1)}
            style={{ marginBottom: 20 }}
          >
            Back
          </div>
        )}
      </div>
      <form onSubmit={register}>
        {activePage === 1 && (
          <BasicInfo
            registerData={registerData}
            onChange={onChange}
            submit={submit}
          />
        )}
        {activePage === 2 && (
          <BusinessInfo
            onChange={onChangeBusiness}
            submit={submit}
            merchantData={merchantData}
          />
        )}
      </form>
      <br />
      <div className="text-center">
        <span className="text-info">
          Already have an account! <NavLink to="/login">Sign in</NavLink>
        </span>
      </div>
    </AuthLayout>
  );
}

export default Register;
