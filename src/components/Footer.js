import React from "react";
import { Link } from "gatsby";
import Divider from "./Divider";
import Slash from "./Slash";

const Footer = () => (
  <div>
    <Divider />
    <footer className="footer">
      <div className="container">
        <div className="content is-size-7" style={{ marginBottom: "1rem" }}>
          <p>
            <Link to="/">&copy; 2019 labelmake.jp</Link>
          </p>
          <Link to="/terms">利用規約</Link>
          <Slash />
          <Link to="/privacy">プライバシーポリシー</Link>
          <Slash />
          <Link to="/contact">お問い合わせ</Link>
        </div>
        <p className="is-size-7">
          動作環境: Google Chrome, Firefox, Safari, Edge, Internet Explorer 11
        </p>
      </div>
    </footer>
  </div>
);

export default Footer;
