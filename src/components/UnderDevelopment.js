import React from "react";
import { Link } from "gatsby";

const UnderDevelopment = () => (
  <div>
    <strong>
      現在開発中...
      <span role="img" aria-label="開発中">
        👨🏼‍💻
      </span>
    </strong>
    <p>
      このサービスのリリース時にメールを受け取りたい方は
      <Link to="/contact">こちらから</Link>
      メールアドレスを登録することができます。
    </p>
  </div>
);

export default UnderDevelopment;
