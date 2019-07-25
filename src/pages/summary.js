import React from "react";
import { Card, DropDown, Button, Icon } from "../components/common";
import { Row, Col, Breadcrumb } from "antd";
import "../styles/default.css";
import verve from "../components/images/verve2.png";
import master from "../components/images/mastercard-icon-png-5a3556c6e81b34.5328243515134450629507.jpg";
import visa from "../components/images/visa3.png";
import lock from "../components/images/lock.ico";
import basic from "../components/images/basic2.png";
import { SmallCard } from "../components/common/card/Card";
import { card } from "react-icons-kit/ionicons";

const opt = [
  { value: 0, content: "Basic" },
  { value: 1, content: "Premium" },
  { value: 2, content: "Master" }
];
const basicImage = basic;
class Summary extends React.Component {
  state = {
    image: null,
    name: null,
    productQuantity: 0,
    price: 0
  };
  componentDidMount() {
    console.log("Did mount text");
    this.setState({ image: basicImage, name: "Basic plan with visa image" });
  }
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
            backgroundColor: "#ffffff",
            paddingTop: "1rem",
            paddingLeft: "5rem",
            paddingBottom: "1rem"
          }}
        >
          <span className="brec">Home ></span>
          <a className="brep"> Summary</a>
          <br />

          {/* <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Summary</Breadcrumb.Item>
                </Breadcrumb> */}

          {/* <span>Checkout</span> */}
          <span style={{ fontSize: "1rem" }}>Summary</span>
        </div>

        <div
          style={{ padding: "30px", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              width: "65%"
            }}
          >
            <Card
              heading={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap"
                  }}
                >
                  <div style={{ width: "50%" }}>Product</div>{" "}
                  <div style={{ width: "8rem" }}>Quantity</div>{" "}
                  <div style={{ width: "8rem" }}>Item Price</div>{" "}
                  <div style={{ textAlign: "right", width: "8rem" }}>
                    Action
                  </div>
                </div>
              }
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap"
                }}
              >
                <div style={{ display: "flex", padding: "10px", width: "50%" }}>
                  <img
                    style={{ width: "100px", height: "100px", padding: "10px" }}
                    src={this.state.image}
                  />

                  <div style={{ padding: "10px" }}>
                    <DropDown
                      dropDownWidth={"230px"}
                      onChange={() => null}
                      active={0}
                      options={opt}
                    />{" "}
                    <br />
                    {this.state.name}
                  </div>
                </div>
                <div style={{ paddingTop: "3rem" }}>
                  {/* quantity increaser and decreaser will use state to change value */}
                  <card
                    style={{
                      boxShadow: "0 0px 2px grey",
                      borderRadius: "3px",
                      width: "6rem",
                      height: "2rem",
                      top: "3rem",
                      display: "flex"
                    }}
                  >
                    <span
                      style={{
                        width: "2rem",
                        borderRightStyle: "solid",
                        borderRightWidth: "1px",
                        borderRightColor: "#e6e6e6"
                      }}
                    >
                      <Icon type={"feather"} name="minus" />
                    </span>
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
                    <span>
                      <Icon type={"feather"} name="plus" />
                    </span>
                  </card>
                </div>
                <div
                  style={{
                    textAlign: "left",
                    paddingTop: "3rem",
                    paddingLeft: "1rem",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    width: "6rem"
                  }}
                >
                  ₦ {this.state.price} <br />
                  <span
                    style={{
                      color: "#bbb",
                      fontWeight: "normal",
                      fontSize: ".7rem"
                    }}
                  >
                    ₦ {this.state.price} x {this.state.productQuantity}
                  </span>
                </div>
                <div
                  style={{
                    textAlign: "right",
                    paddingTop: "3rem",
                    paddingLeft: "1rem",
                    width: "8rem"
                  }}
                >
                  Remove Item
                </div>
              </div>
            </Card>
            <br />
          </div>
          <div
            style={{
              width: "25%",
              paddingLeft: "20px"
            }}
          >
            <SmallCard style={{ borderRadius: "3px" }} heading={"Checkout"}>
              <div style={{ padding: "20px" }}>Sub-total:</div>

              <div className="summaryList">Delivery charges</div>

              <div className="summaryList">
                <span className="total-text">Total </span>
              </div>

              <div className="summaryList-up">
                <span
                  style={{
                    color: "#b87300",
                    textAlign: "right",
                    width: "100%",
                    fontSize: ".6875rem"
                  }}
                >
                  Excluding delivery charges
                </span>
                <span style={{ padding: "10px" }}>
                  {" "}
                  <Button
                    style={{ borderRadius: "5px", width: "100%", top: "10px" }}
                    color={"success"}
                  >
                    Continue to Checkout
                  </Button>
                </span>
              </div>

              <div
                className="summaryList"
                style={{
                  display: "flex",
                  borderTopStyle: "solid",
                  borderTopWidth: "1px",
                  borderTopColor: "#e6e6e6",
                  padding: "5px"
                }}
              >
                <span className="security-text">We accept</span>
                <img className="fin-service" src={verve} alt="fin-service" />
                <img className="fin-service" src={master} alt="fin-service" />
                <img className="fin-service" src={visa} alt="fin-service" />
              </div>

              <div style={{ display: "flex" }}>
                <img className="lock-icon" src={lock} alt="fin-service" />
                <span className="security-text">
                  Transactions are 100% Safe and Secure
                </span>
              </div>
            </SmallCard>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
