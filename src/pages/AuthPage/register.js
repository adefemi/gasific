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
      callback_url: "http://web2.gasific.ng/confirm",
      phoneNumber: registerData.phoneNumber,
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

const BasicInfo = props => {
  return (
    <>
      <div className="grid-2">
        <FormGroup title="First Name">
          <Input
            required
            name="firstName"
            value={props.registerData.firstName || ""}
            onChange={props.onChange}
          />
        </FormGroup>
        <FormGroup title="Last Name">
          <Input
            required
            name="lastName"
            value={props.registerData.lastName || ""}
            onChange={props.onChange}
          />
        </FormGroup>
      </div>
      <div className="grid-2">
        <FormGroup title="Email Address">
          <Input
            required
            name="email"
            type="email"
            value={props.registerData.email || ""}
            onChange={props.onChange}
          />
        </FormGroup>
        <FormGroup title="Phone Number">
          <Input
            required
            name="phoneNumber"
            type="number"
            value={props.registerData.phoneNumber || ""}
            onChange={props.onChange}
          />
        </FormGroup>
      </div>

      <div className="grid-2">
        <FormGroup title="Password">
          <Input
            required
            name="password"
            type="password"
            value={props.registerData.password || ""}
            onChange={props.onChange}
          />
        </FormGroup>
        <FormGroup title="Confirm Password">
          <Input
            required
            name="cpassword"
            type="password"
            value={props.registerData.cpassword || ""}
            onChange={props.onChange}
          />
        </FormGroup>
      </div>

      <FormGroup title="Register as" className="label-inline">
        <br />
        <Radio.Group
          name="role"
          defaultValue={"customer"}
          onChange={props.onChange}
        >
          <Radio value="customer">Customer</Radio>
          <Radio value="merchant">Merchant</Radio>
        </Radio.Group>
      </FormGroup>

      <Button
        block
        type="submit"
        loading={props.submit}
        disabled={props.submit}
      >
        {props.registerData.role && props.registerData.role === "merchant"
          ? "Continue"
          : "Register"}
      </Button>
    </>
  );
};

const BusinessInfo = props => {
  const [states, setStates] = useState(null);
  useEffect(() => {
    setStates(getAllStates("nigeria", true));
  }, []);
  return (
    <>
      <FormGroup title="Business Name">
        <Input
          required
          name="businessName"
          placeholder="Provide your business name"
          value={props.merchantData.businessName || ""}
          onChange={props.onChange}
        />
      </FormGroup>
      <FormGroup title="Contact Name">
        <Input
          required
          name="contactName"
          placeholder="What's you contact name"
          value={props.merchantData.contactName || ""}
          onChange={props.onChange}
        />
      </FormGroup>
      <FormGroup title="Address">
        <Input
          required
          name="address"
          placeholder="Enter you business address"
          value={props.merchantData.address || ""}
          onChange={props.onChange}
        />
      </FormGroup>
      <div className="grid-2">
        <FormGroup title="City">
          <Input
            required
            name="city"
            placeholder="What city are you located"
            value={props.merchantData.city || ""}
            onChange={props.onChange}
          />
        </FormGroup>
        <FormGroup title="State">
          <Select
            required
            name="state"
            value={props.merchantData.state || ""}
            onChange={props.onChange}
          >
            {states &&
              states.length > 1 &&
              states.map((item, ind) => {
                return (
                  <Select.Option key={ind} value={item.value}>
                    {item.name}
                  </Select.Option>
                );
              })}
          </Select>
        </FormGroup>
      </div>
      <Button
        block
        type="submit"
        loading={props.submit}
        disabled={props.submit}
      >
        Register
      </Button>
    </>
  );
};

export default Register;
