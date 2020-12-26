import React from "react";
import "./MainHeader.css";

export default function MainHeader(props) {
  //props children is special props React knows
  //props children always refers to the things you pass between opening and closing tags of your component

  return <header className="main-header">{props.children}</header>;
}
