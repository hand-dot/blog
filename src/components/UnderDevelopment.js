import React from "react";
import { Link } from "gatsby";

const UnderDevelopment = () => (
  <div>
    <strong>
      現在整理中...
      <span role="img" aria-label="開発中">
        👨🏼‍💻
      </span>
    </strong>
    <p>
      <Link to="/contact">こちらから</Link>
      お問い合わせください。
    </p>
  </div>
);

export default UnderDevelopment;
