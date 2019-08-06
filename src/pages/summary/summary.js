import React from "react";
import {
  Card,
  DropDown,
  Button,
  Icon,
  FormGroup,
  Input,
  Select
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
      availablePlans: [],
      deliveryData: {},
      referralSwitch: true,
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

  adder() {
    this.setState({ productQuantity: this.state.productQuantity + 1 });
  }

  reducer() {
    if (this.state.productQuantity > 0) {
      this.setState({ productQuantity: this.state.productQuantity - 1 });
    }
  }

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

  onSubmit = () => {
    localStorage.setItem("gas_plan", this.state.plan_id);
    this.props.history.push("/payment");
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
          <div className="grid-2-v">
            <div>
              <Card
                heading={
                  <div className="dflex align-center">
                    <div style={{ flex: "3" }}>Product</div>{" "}
                    <div style={{ flex: "1", textAlign: "center" }}>
                      Item Price
                    </div>
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
                      src={this.state.image}
                    />

                    <div style={{ paddingLeft: "20px" }}>
                      <DropDown
                        dropLogo
                        dropDownWidth={"120px"}
                        onChange={this.productChanger}
                        active={0}
                        options={opt}
                      />{" "}
                      {this.state.name}
                    </div>
                  </div>

                  <div
                    className="dflex justify-center align-center flex-d-v"
                    style={{ flex: 1 }}
                  >
                    ₦ {numberWithCommas(this.state.price)} <br />
                  </div>
                </div>
              </Card>
              <br />
              <Card style={{ width: "100%" }}>
                <div className="padding-20">
                  <div className="heading">Delivery Information</div>

                  <FormGroup title="Home Address">
                    <Input
                      required
                      name="address"
                      value={this.state.deliveryData.address || ""}
                      type="text"
                      onChange={this.onChange}
                    />
                  </FormGroup>
                  <div className="grid-2">
                    <FormGroup title="City">
                      <Input
                        required
                        name="city"
                        value={this.state.deliveryData.city || ""}
                        type="text"
                        onChange={this.onChange}
                      />
                    </FormGroup>
                    <FormGroup title="State">
                      <Select
                        required
                        name="state"
                        value={this.state.deliveryData.state || ""}
                        onChange={this.onChange}
                      >
                        {this.state.states.length > 1 &&
                          this.state.states.map((item, ind) => {
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
                            defaultChecked
                            onChange={this.onChangeSwitch}
                          />
                        </div>
                      }
                    >
                      {this.state.referralSwitch && (
                        <Input
                          name="referral"
                          value={this.state.deliveryData.referral || ""}
                          type="text"
                          onChange={this.onChange}
                        />
                      )}
                    </FormGroup>
                  </div>
                </div>
              </Card>
            </div>
            <div>
              <Card
                heading={
                  <div className="dflex align-center justify-between padding-10">
                    <div>Checkout</div>
                    <div>{this.state.productQuantity} items</div>
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

                <div className="divider" />

                <div className="dflex align-center justify-between padding-20">
                  <div className="bolder-text">Total </div>
                  <div>₦ {numberWithCommas(5500)}</div>
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
                  <Button block color={"success"} onClick={this.onSubmit}>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
