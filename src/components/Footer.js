import React from "react";
import { Link } from "gatsby";
import Divider from "./Divider";
import Slash from "./Slash";
import { DOMAIN } from "../constants";

const Footer = () => (
  <div>
    <Divider />
    <footer className="footer" style={{ backgroundColor: "#333c44" }}>
      <div className="container">
        <div className="content is-size-7" style={{ marginBottom: "1rem" }}>
          <p>
            <Link style={{ color: "#fff" }} to="/">
              &copy; 2019 {DOMAIN}
            </Link>
          </p>
          <Link style={{ color: "#fff" }} to="/terms">
            利用規約
          </Link>
          <Slash />
          <Link style={{ color: "#fff" }} to="/privacy">
            プライバシーポリシー
          </Link>
          <Slash />
          <Link style={{ color: "#fff" }} to="/contact">
            お問い合わせ
          </Link>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
