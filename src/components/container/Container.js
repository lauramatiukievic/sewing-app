import React from "react";
import "./Container.scss";

function Container({ classes, children }) {
  const addedClasses = classes ? classes : "";
  return <div className={`containers ${addedClasses} `}>{children}</div>;
}

export default Container;
