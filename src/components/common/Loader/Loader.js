import React from "react";
import "./loader.css";
import LoaderGif from "../../../assets/loader.gif";

export function Loader(props) {
  return (
    <div className="loader-main">
      <img src={LoaderGif} alt="" />
    </div>
  );
}
