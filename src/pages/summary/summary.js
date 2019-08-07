import React from "react";
import {
  Card,
  DropDown,
  Button,
  FormGroup,
  Input,
  Select,
  Notification
} from "../../components/common";
import "./summary.css";
import verve from "./images/verve2.png";
import master from "./images/mastercard-icon-png-5a3556c6e81b34.5328243515134450629507.jpg";
import visa from "./images/visa3.png";
import lock from "./images/lock.ico";
import basic from "./images/saphire.jpg";
import premium from "./images/onyx1.jpg";
import platinum from "./images/gold.jpg";
import {
  numberWithCommas,
  axiosFunc,
  errorHandler,
  getAllStates
} from "../../components/utils/helper";
import logo from "../../assets/logos/logo1.png";
import { NavLink } from "react-router-dom";
import { getPlanUrl } from "../../components/utils/api";
import { Switch } from "antd";

import hardwareImg from "../../assets/hardware.jpg";

const opt = [
  { value: 0, content: "Onyx" },
  { value: 1, content: "Sapphire" },
  { value: 2, content: "Gold" }
];
const basicImage = premium;
const premiumImage = basic;
const platinumImage = platinum;

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: basicImage,
      name: "",
      productQuantity: 1,
      price: 0,
      loading: false,
      availablePlans: [],
      deliveryData: {},
      referralSwitch: false,
      states: []
    };
  }

  // for when components mount
  componentDidMount() {
    this.getPlans();
    this.setState({ states: getAllStates("nigeria", true) });
  }

  // function to get plans
  getPlans() {
    axiosFunc("GET", getPlanUrl, {}, {}, this.onGetPlans);
  }

  // callback for getting plans
  onGetPlans = (status, data) => {
    if (status) {
      this.setState({ availablePlans: data.data.data.plans });
      // let plans = data.data.data.plans
      this.setState({
        plan_id: this.state.availablePlans[1].id,
        name: this.state.availablePlans[1].name,
        price: this.state.availablePlans[1].price
      });
    } else {
      Notification.bubble({
        type: "error",
        content: errorHandler(data)
      });
    }
  };

  productChanger = active => {
    if (active.value === 1) {
      this.setState({
        plan_id: this.state.availablePlans[0].id,
        name: this.state.availablePlans[0].name,
        image: premiumImage,
        price: this.state.availablePlans[0].price
      });
    } else if (active.value === 2) {
      this.setState({
        plan_id: this.state.availablePlans[2].id,
        image: platinumImage,
        name: this.state.availablePlans[2].name,
        price: this.state.availablePlans[2].price
      });
    } else {
      this.setState({
        plan_id: this.state.availablePlans[1].id,
        image: basicImage,
        name: this.state.availablePlans[1].name,
        price: this.state.availablePlans[1].price
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    localStorage.setItem(
      "user_info",
      JSON.stringify({
        ...this.state.deliveryData,
        plan_id: this.state.plan_id
      })
    );
    this.setState({ loading: true });
    setTimeout(() => {
      this.props.history.push("/payment");
    }, 2000);
  };

  onChange = e => {
    const { deliveryData } = this.state;
    deliveryData[e.target.name] = e.target.value;
    this.setState({
      deliveryData
    });
  };

  onChangeSwitch = checked => {
    this.setState({ referralSwitch: checked });
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "#f2f2f2",
          height: "100vh"
        }}
      >
        <div
          style={{
            backgroundColor: "#3486eb",
            paddingTop: "1rem",
            paddingLeft: "5rem",
            paddingBottom: "1rem"
          }}
        />
        <div
          style={{
            backgroundColor: "#ffffff",
            paddingTop: "1rem",
            paddingLeft: "5rem",
            paddingBottom: "1rem"
          }}
        >
          <div className="max-width-1400">
            <div className="dflex align-center">
              <NavLink to="/">
                <img src={logo} width={100} alt="" />
              </NavLink>
            </div>
          </div>
        </div>

        <div className="padding-20 dflex justify-center max-width-1400">
          <form onSubmit={this.onSubmit} className="grid-2-v">
            <div>
              <ProductList
                state={this.state}
                productChanger={this.productChanger}
              />
              <br />
              <Delivery
                state={this.state}
                onChange={this.onChange}
                onChangeSwitch={this.onChangeSwitch}
              />
            </div>
            <div>
              <CheckOutCard state={this.state} loading={this.state.loading} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export const Delivery = props => {
  let { state, onChange, onChangeSwitch } = props;
  return (
    <Card style={{ width: "100%" }}>
      <div className="padding-20">
        <div className="heading">Delivery Information</div>

        <FormGroup title="Home Address">
          <Input
            required
            name="address"
            value={state.deliveryData.address || ""}
            type="text"
            onChange={onChange}
          />
        </FormGroup>
        <div className="grid-2">
          <FormGroup title="City">
            <Input
              required
              name="city"
              value={state.deliveryData.city || ""}
              type="text"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup title="State">
            <Select
              required
              name="state"
              value={state.deliveryData.state || ""}
              onChange={onChange}
            >
              {state.states.length > 1 &&
                state.states.map((item, ind) => {
                  return (
                    <Select.Option key={ind} value={item.value}>
                      {item.name}
                    </Select.Option>
                  );
                })}
            </Select>
          </FormGroup>
        </div>

        <div className="grid-2">
          <FormGroup
            title={
              <div className="dflex align-center">
                <span> Referral/Discount Code</span>
                <div className="margin-left-10" />
                <Switch
                  checked={state.referralSwitch}
                  onChange={onChangeSwitch}
                />
              </div>
            }
          >
            {state.referralSwitch && (
              <Input
                name="referral"
                value={state.deliveryData.referral || ""}
                type="text"
                onChange={onChange}
              />
            )}
          </FormGroup>
        </div>
      </div>
    </Card>
  );
};

export const ProductList = props => {
  const { state, productChanger } = props;
  return (
    <Card
      heading={
        <div className="dflex align-center">
          <div style={{ flex: "3" }}>Product</div>{" "}
          <div style={{ flex: "1", textAlign: "center" }}>Item Price</div>
        </div>
      }
    >
      <div className="dflex padding-20">
        <div className="dflex align-center" style={{ flex: 3 }}>
          <img
            style={{
              width: "100px",
              height: "100px"
            }}
            src={state.image}
          />

          <div style={{ paddingLeft: "20px" }}>
            <DropDown
              dropLogo
              dropDownWidth={"120px"}
              onChange={productChanger}
              active={0}
              options={opt}
            />{" "}
            {state.name}
          </div>
        </div>

        <div
          className="dflex justify-center align-center flex-d-v"
          style={{ flex: 1 }}
        >
          ₦ {numberWithCommas(state.price)} <br />
        </div>
      </div>
      <div className="divider" />
      <div className="dflex padding-20">
        <div className="dflex align-center" style={{ flex: 3 }}>
          <img
            style={{
              width: "100px",
              height: "100px"
            }}
            src={hardwareImg}
          />

          <div className="padding-20 bolder-text">Hardware</div>
        </div>

        <div
          className="dflex justify-center align-center flex-d-v"
          style={{ flex: 1 }}
        >
          ₦ {numberWithCommas(5000)} <br />
        </div>
      </div>
    </Card>
  );
};

export const CheckOutCard = props => {
  const { state, loading } = props;

  return (
    <Card
      heading={
        <div className="dflex align-center justify-between padding-10">
          <div>Checkout</div>
          <div>{state.productQuantity} items</div>
        </div>
      }
    >
      <div className="dflex align-center justify-between padding-20">
        <div className="">
          <span>Delivery:</span>
        </div>
        <div>₦ {numberWithCommas(500)}</div>
      </div>
      <div className="dflex align-center justify-between padding-20">
        <div className="">
          <span>Hardware:</span>
        </div>
        <div>₦ {numberWithCommas(5000)}</div>
      </div>
      {state.referralSwitch && (
        <div className="dflex align-center justify-between padding-20">
          <div className="">
            <span>Discount:</span>
          </div>
          <div>-0.0</div>
        </div>
      )}

      <div className="divider" />

      <div className="dflex align-center justify-between padding-20">
        <div className="bolder-text">Total </div>
        <div className="bolder-text">₦ {numberWithCommas(5500)}</div>
      </div>
      <div className="divider" />
      <div className="padding-20">
        <div
          style={{
            color: "#b87300",
            fontSize: ".6875rem"
          }}
        >
          Excluding delivery charges
        </div>
        <p />
        <Button
          block
          color={"success"}
          type="submit"
          disabled={loading}
          loading={loading}
        >
          Continue to Payment
        </Button>
      </div>

      <div className="divider" />

      <div className="dflex align-center padding-10">
        <span className="security-text ">We accept</span>
        <div className="margin-left-10">
          <img width={50} src={verve} alt="fin-service" />
        </div>
        <div className="margin-left-10">
          <img width={50} src={master} alt="fin-service" />
        </div>
        <div className="margin-left-10">
          <img width={50} src={visa} alt="fin-service" />
        </div>
      </div>

      <div className="dflex align-center padding-10">
        <img width={30} height={30} src={lock} alt="fin-service" />
        <span className="security-text">
          Transactions are 100% Safe and Secure
        </span>
      </div>
    </Card>
  );
};

export default Summary;
