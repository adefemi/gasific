import React, { useState } from "react";
import AnimateHeight from "react-animate-height";

function Faq(props) {
  return (
    <div>
      <div className="heading">FAQs</div>
      {faqData.map((item, ind) => (
        <Acordion id={ind} key={ind} title={item.title} ans={item.ans} />
      ))}
    </div>
  );
}

export const Acordion = props => {
  const [height, setHeight] = useState({});

  const toggleHeight = id => {
    setHeight({ [id]: !height[id] });
  };

  return (
    <div className="faq-main">
      <div className="title-content" onClick={() => toggleHeight(props.id)}>
        {props.title ? props.title : "Title here"}
      </div>
      <AnimateHeight duration={300} height={height[props.id] ? "auto" : 0}>
        <ul>{props.ans ? props.ans : <p>Answers here</p>}</ul>
      </AnimateHeight>
    </div>
  );
};

export const faqData = [
  {
    title: "Can I pay cash on delivery for the technology?",
    ans: <li>No, you can only pay online to get onboard to the service</li>
  },
  {
    title: "What happens if the hardware gets damaged?",
    ans: (
      <li>
        All you need to do is reach out to our customer service team and we
        replace it for you in less than 7 working days. Terms and condition
        applies
      </li>
    )
  },
  {
    title:
      "Is it safe for the hardware to be placed outside my kitchen with my gas cylinder?",
    ans: (
      <li>
        Yes, the hardware has been engineered to withstand any form of external
        factor
      </li>
    )
  },
  {
    title:
      "When my cooking gas finished and I want to refill, can the cylinder be take to the refill point with the device attached?",
    ans: (
      <li>
        Yes. The device is built to be attached and stick to a gas cylinder no
        matter how frequently it is moved around
      </li>
    )
  },
  {
    title: "Can I move or give out my hardware to a family or friend?",
    ans: (
      <li>
        Yes you can. Only that the bank account details registered initially to
        the hardware will continue to be debited for subscription fee except
        otherwise stated
      </li>
    )
  },
  {
    title:
      "How soon do I own the hardware and stop paying for the subscription fee?",
    ans: (
      <li>
        You do not stop paying subscription fee for this service. However, 2
        years after purchasing the hardware and have consistent paid for the
        subscription fee, the subscription fee reduces by 30% (i.e. N700 drops
        to N500 after 2 years)
      </li>
    )
  },
  {
    title: "How much is the device?",
    ans: <li>N5,000 one-off payment</li>
  },
  {
    title:
      "Do I pay for the emails, SMS and other communication channels for this service?",
    ans: (
      <li> No, all of these and more are covered in your subscription fee</li>
    )
  },
  {
    title: "How long does it take me to get the device if I order it online?",
    ans: <li> You should get your device within 48 - 36 hours</li>
  },
  {
    title: "What is your customer service contact?",
    ans: (
      <li>
        {" "}
        Our email address is support@gasific.ng and phone number is +234808 222
        0000
      </li>
    )
  },
  {
    title: "Can I get the device delivered to me anywhere in Nigeria",
    ans: (
      <li>
        {" "}
        Yes, deliveries can be made anywhere within Nigeria. However, locations
        outside Lagos would require addition 3 - 4 working days to get the
        device to you
      </li>
    )
  },
  {
    title:
      "I see the device name is splitted into 3, am I paying for 3 different items?",
    ans: (
      <li>
        {" "}
        No, you are not. Upon paying the one-off device fee of N5,000, we would
        be providing you with a kit containing 2 separate hardwares. GS1901 and
        GS1902
      </li>
    )
  },
  {
    title: "What is the difference between GS1900, GS1901 and GS1902?",
    ans: (
      <li>
        <div>GS1900 - Name of Gasific’s product Kit</div>
        <div>
          GS1901 - This is to be connected underneath your gas cylinder for
          detection purposes
        </div>
        <div>
          GS1902 - This is to be connected to an electric socket for tracking
          and monitoring purposes
        </div>
      </li>
    )
  },
  {
    title: "What is the difference between GS1900, GS1901 and GS1902?",
    ans: (
      <li>
        <div>* GS1900 - Name of Gasific’s product Kit</div>
        <div>
          * GS1901 - This is to be connected underneath your gas cylinder for
          detection purposes
        </div>
        <div>
          * GS1902 - This is to be connected to an electric socket for tracking
          and monitoring purposes
        </div>
      </li>
    )
  },
  {
    title:
      "The battery connect to the drive how long will they last and what happens if they get damaged?",
    ans: (
      <li>
        Our batteries are expected to last a minimum of 5 years but in the event
        that you encounter an issue, please reach out to us so we can change it
      </li>
    )
  },
  {
    title: "What happens if I don’t pay my subscription fee?",
    ans: (
      <li>
        You loose access to your customer data online, you do not get automated
        or on-demand update about your gas consumption
      </li>
    )
  },
  {
    title:
      "At what point can I make use of accumulated points to pay for my subscription?",
    ans: (
      <li>
        Once you get to 100 points, you will be granted access to use your point
        to make payments
      </li>
    )
  },
  {
    title: "What other advantage do I get for subscribing for your service?",
    ans: (
      <li>
        We provide you with information about gas leaks from your cylinder
      </li>
    )
  },
  {
    title: "What other advantage do I get for subscribing for your service?",
    ans: (
      <li>
        We provide you with information about gas leaks from your cylinder the
        closest gas plants to your house gas plants with the cheapest gas for
        sale monthly tips on how to manage the consumption of your gas links to
        gas plants that run home delivery services and many more...
      </li>
    )
  },
  {
    title: "For how long can I stop paying subscription fee?",
    ans: (
      <li>
        We do not advice you stop paying the subscription because you loose
        access to the valuable information we are providing
      </li>
    )
  }
];

export default Faq;
