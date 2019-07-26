import React from "react"
import {Card, DropDown, Button, Icon} from "../../components/common"
import {Row, Col, Breadcrumb} from "antd"
import "./summary.css"
import verve from "./images/verve2.png"
import master from "./images/mastercard-icon-png-5a3556c6e81b34.5328243515134450629507.jpg"
import visa from "./images/visa3.png"
import lock from "./images/lock.ico"
import basic from "./images/basic2.png"
import premium from "./images/premium.png"
import platinum from "./images/platinum.png"
import { SmallCard } from "../../components/common/card/Card";
// import { card } from "react-icons-kit/ionicons";

const opt = [{value: 0, content: "Basic"},{value: 1, content: "Premium"}, {value: 2, content: "Platinum"}]
const basicImage = basic;
const premiumImage = premium;
const platinumImage = platinum;
class Summary extends React.Component {
    
    state = {
        image: null,
        name: null,
        productQuantity: 1,
        price: 0,
       

    }
    componentDidMount(){
        console.log("Did mount text")
        this.setState({image: basicImage, name: "Basic product", price: 99000})
    }

    adder(){
        this.setState({productQuantity: this.state.productQuantity + 1})
    }

    reducer() {
        if (this.state.productQuantity > 0){
        this.setState({productQuantity: this.state.productQuantity - 1})
        }
        else{

        }
    }

    productChanger = (active) => {
        if (active.value == 1)
        {
            this.setState({name: "Premium Product", image: premiumImage, price: 150000})
        }
        else if(active.value == 2){
            this.setState({image: platinumImage, name: "Platinum Product", price: 299000})
        }
        else{
            this.setState({image: basicImage, name: "Basic Product", price: 99000})
        }
    }

   render() {
       return(
           <div 
           style ={{
            backgroundColor: "#f2f2f2",
            height: "100vh"
           }}
           >
              <div style = {{backgroundColor: "#3486eb", paddingTop: "1rem", paddingLeft: "5rem", paddingBottom: "1rem"}}></div>
               <div style = {{backgroundColor: "#ffffff", paddingTop: "1rem", paddingLeft: "5rem", paddingBottom: "1rem"}}>
                <span className = "brec">Home ></span><a className="brep"> Summary</a><br/>

                {/* <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Summary</Breadcrumb.Item>
                </Breadcrumb> */}

                {/* <span>Checkout</span> */}
                <span style = {{fontSize: "1rem"}}>Summary</span>
                </div>

                <div style={{padding: "30px", display: "flex", justifyContent: "center"}}>
                    <div
                     style = {{
                         width: "65%"
                     }}>
                        <Card heading = {<div style = {{display: "flex", flexDirection: "row", flexWrap: "wrap"}}><div style = {{width: "60%"}}>Product</div>  <div style = {{width: "20%"}}>Quantity</div> <div style = {{width: "20%", textAlign: "right"}}>Item Price</div></div>}>
                            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                                <div style={{display: "flex", padding: "10px", width: "60%"}}>
                                
                                    <img style = {{width: "100px", height: "100px", padding: "10px"}} src = {this.state.image} />
                           
                           
                                
                                    <div style = {{padding: "10px"}}><DropDown dropDownWidth={"230px"} onChange = {this.productChanger} active = {0} options ={opt} /> <br/>
                                    {this.state.name}
                                    </div>
                                
                                </div>
                                <div style = {{ paddingTop: "3rem", width: "20%"}}>
{/* quantity increaser and decreaser will use state to change value */}
                                    <card  style = {{boxShadow: "0 0px 2px grey", borderRadius: "3px", width: "6rem", height: "2rem", top: "3rem", display: "flex", textAlign: "center"}}>
                                        <a style = {{width: "2rem", borderRightStyle: "solid", borderRightWidth: "1px",  borderRightColor: "#e6e6e6", textAlign: "center"}} onClick = {e => this.reducer()}><Icon type = "feather" name = "minus" /></a>
                                        <span style = {{width: "2rem", borderRightStyle: "solid", borderRightWidth: "1px",  borderRightColor: "#e6e6e6"}}>
                                        {this.state.productQuantity}
                                        </span>
                                        <a  style = {{textAlign: "center", width: "2rem"}} onClick = {e => this.adder()}><Icon type = "feather" name = "plus" /></a>
                                    </card> 
                                </div>
                                <div style = {{textAlign: "right", paddingTop: "3rem", fontWeight: "bold", fontSize: "1rem", width: "15%"}}>    
                                    ₦ {this.state.price} <br/>
                                    <span style = {{color: "#bbb", fontWeight: "normal", fontSize: ".7rem"}}>₦ {this.state.price} x {this.state.productQuantity}</span>
                                </div>
                            </div>
                        </Card>
                        <br/>
                    </div>
                    <div
                    style={{
                        width: "25%",
                        paddingLeft: "20px",
                       
                    }}>
                        <Card style={{borderRadius: "3px"}}  heading = {<div style = {{display: "flex", padding: "10px", borderBottom: "1px", type: "solid" , borderColor: "#e6e6e6", fontSize: "16px", fontWeight:  "500"}}>Checkout<div style = {{textAlign: "right", width: "100%"}}>{this.state.productQuantity} items</div></div>}>
                            
                            <div className = "summary-no">
                                <div className = "brecv1">
                                Sub-total:
                                </div> 
                                <div style = {{width: "100%", textAlign: "right"}} >
                                    ₦ {this.state.price}
                                </div>
                            </div>
                            
                            <div className = "summaryList">
                                <div>
                                    Delivery charges : 
                               </div>
                               <div className = "security-text">
                               Add your Delivery address at checkout to see delivery charges
                               </div>
                            </div>

                            <div className = "summaryList">
                              <div className="total-text">Total </div>
                              <div style = {{textAlign: "right", width: "100%"}}> ₦ {this.state.price * this.state.productQuantity}</div>
                            </div>

                            <div className = "summaryList-up">
                              <span style={{
                                  color: "#b87300",
                                  textAlign: "right",
                                  width: "100%",
                                  fontSize: ".6875rem"
                              }}>Excluding delivery charges</span>
                                <span style = {{padding: "10px"}}> <Button style = {{borderRadius: "5px", width: "100%", top: "10px"}} color = {"success"} >Continue to Checkout</Button></span>
                            </div>

                            <div className = "summaryList" style = {{
                                display: "flex",
                                borderTopStyle: "solid",
                                borderTopWidth: "1px",
                                borderTopColor: "#e6e6e6",
                                padding: "5px" }}>
                              <span className= "security-text">We accept</span>
                              <img className = "fin-service" src = {verve} alt = "fin-service"/>
                              <img className = "fin-service" src = {master} alt = "fin-service"/>
                              <img className = "fin-service" src = {visa} alt = "fin-service"/>
                            </div>
                            
                            <div style = {{display: "flex"}}>
                              <img className="lock-icon" src = {lock} alt = "fin-service"/>
                              <span className= "security-text">Transactions are 100% Safe and Secure</span>
                            </div>
                        </Card>
                    </div>
                </div>
          
           </div>
       )
   }
}

export default Summary;