import React from "react";
import { Card, DropDown, Button, Icon } from "../../components/common";
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
  errorHandler
} from "../../components/utils/helper";
import logo from "../../assets/logos/logo1.png";
import { NavLink } from "react-router-dom";
import { getPlanUrl } from "../../components/utils/api";

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
      availablePlans: []
    };
  }

  // for when components mount
  componentDidMount() {
    this.getPlans();
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
    this.props.history.push("/login");
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
                      Quantity
                    </div>{" "}
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
                    className="dflex align-center justify-center"
                    style={{ flex: 1 }}
                  >
                    {/* quantity increaser and decreaser will use state to change value */}
                    <card
                      style={{
                        boxShadow: "0 0px 2px grey",
                        borderRadius: "3px",
                        width: "6rem",
                        height: "1.5rem",
                        top: "3rem",
                        display: "flex",
                        textAlign: "center"
                      }}
                    >
                      <a
                        style={{
                          width: "2rem",
                          borderRightStyle: "solid",
                          borderRightWidth: "1px",
                          borderRightColor: "#e6e6e6",
                          textAlign: "center"
                        }}
                        onClick={e => this.reducer()}
                      >
                        <Icon type="feather" name="minus" />
                      </a>
                      <span
                        style={{
                          width: "2rem",
                          borderRightStyle: "solid",
                          borderRightWidth: "1px",
                          borderRightColor: "#e6e6e6"
                        }}
                      >
                        {this.state.productQuantity}
                      </span>
                      <a
                        style={{ textAlign: "center", width: "2rem" }}
                        onClick={e => this.adder()}
                      >
                        <Icon type="feather" name="plus" />
                      </a>
                    </card>
                  </div>
                  <div
                    className="dflex justify-center align-center flex-d-v"
                    style={{ flex: 1 }}
                  >
                    ₦ {numberWithCommas(this.state.price)} <br />
                    <span
                      style={{
                        color: "#bbb",
                        fontWeight: "normal",
                        fontSize: ".7rem"
                      }}
                    >
                      ₦ {numberWithCommas(this.state.price)} x{" "}
                      {this.state.productQuantity}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
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
                  <span>Sub-total:</span>
                </div>
                <div>₦ {numberWithCommas(this.state.price)}</div>
              </div>

              <div className="divider" />

              <div className="dflex align-center justify-between padding-20">
                <div>Delivery charges:</div>
                <div className="security-text">
                  Add your Delivery address at checkout to see delivery charges
                </div>
              </div>

              <div className="divider" />

              <div className="dflex align-center justify-between padding-20">
                <div className="bolder-text">Total </div>
                <div>
                  ₦{" "}
                  {numberWithCommas(
                    this.state.price * this.state.productQuantity
                  )}
                </div>
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
                  Continue to Checkout
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
    );
  }
}

export default Summary;
