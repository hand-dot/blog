import React from "react";
import PropTypes from "prop-types";

const Divider = ({ getterBottom }) => (
  <div
    style={{
      marginBottom: getterBottom ? "1.5rem" : "",
      borderBottom: "1px solid #eee"
    }}
  />
);

Divider.propTypes = {
  getterBottom: PropTypes.bool
};

export default Divider;
