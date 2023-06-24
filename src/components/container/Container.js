import React from "react";
import "./Container.css";

function Container({ classes, children }) {
  const addedClasses = classes ? classes : "";
  return <div className={`container ${addedClasses} `}>{children}</div>;
}

export default Container;
