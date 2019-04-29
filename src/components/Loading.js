import React from "react";
import Overlay from "./Overlay";
export default ({ loading }) =>
  loading ? (
    <Overlay color="#0a0a0a99">
      <span className="button is-text is-large is-loading" />
    </Overlay>
  ) : null;
