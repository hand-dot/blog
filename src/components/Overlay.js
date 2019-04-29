import React from "react";
export default ({ color, children }) => (
  <div
    style={{
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      position: "fixed",
      zIndex: 9999,
      backgroundColor: color,
      marginTop: -52
    }}
  >
    {children}
  </div>
);
