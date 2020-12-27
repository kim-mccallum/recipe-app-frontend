import React from "react";
import ReactDOM from "react-dom";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  const content = <aside className="side-drawer">{props.children}</aside>;
  //use a React Portal to improve html semantics
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
