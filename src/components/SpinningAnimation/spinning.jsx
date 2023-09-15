import React from "react";
import "./SpinningAnimation.css"; // Import your CSS file
import cx from "classnames";

const SpinningAnimation = ({ icon, loading = true }) => {
  return (
    <div className="spinner-container">
      <div className={cx("spinner", !loading ? "spinning-stop" : "")}></div>
      <div className="spinner-center">{icon}</div>
    </div>
  );
};

export default SpinningAnimation;
