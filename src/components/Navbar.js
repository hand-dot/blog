import React, { Component } from "react";
import Helmet from "react-helmet";
import Logo from "./Logo";
import { StaticQuery, graphql, Link } from "gatsby";
import notification from "../img/notification-icon.svg";

let headwayAccount = "";
const Notification = () => {
  if (
    typeof window !== "undefined" &&
    window.Headway &&
    headwayAccount !== "none" &&
    headwayAccount !== ""
  ) {
    setTimeout(() => {
      window.Headway.init({
        selector: "#changelog",
        account: headwayAccount
      });
    });
  }
  return (
    <span
      style={{ display: "flex", alignItems: "center" }}
      className="navbar-item"
    >
      <span
        id="changelog"
        style={{ position: "absolute", left: 17, top: 20 }}
        className="icon"
      />
      <img src={notification} alt="notification" style={{ width: 24 }} />
    </span>
  );
};

const Item = ({ icon, label }) => {
  return (
    <>
      {icon && (
        <span className="icon">
          <img src={icon} alt={label} style={{ width: 18 }} />
        </span>
      )}
      <span style={{ paddingLeft: 5 }} className="has-text-weight-light">
        {label}
      </span>
    </>
  );
};

const NavItem = ({ icon = null, label = "", link = "" }) => (
  <Link className="navbar-item nav-item" to={link}>
    <Item icon={icon} label={label} />
  </Link>
);

const NavItemForOutSide = ({ icon = null, label = "", link = "" }) => (
  <a
    className="navbar-item nav-item"
    href={link}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Item icon={icon} label={label} />
  </a>
);

const NavItems = ({ isPC }) => (
  <>
    <div className="navbar-end">
      <NavItem label="About" link="/about" />
      <NavItem label="Contact" link="/contact" />
      <NavItemForOutSide label="Twitter" link="https://twitter.com/hand_dot" />
      <NavItemForOutSide label="Github" link="https://github.com/hand-dot/" />
    </div>
    {isPC && <Notification />}
  </>
);

const Hamburger = () => (
  <>
    <span style={{ color: "#fff" }} aria-hidden="true" />
    <span style={{ color: "#fff" }} aria-hidden="true" />
    <span style={{ color: "#fff" }} aria-hidden="true" />
  </>
);

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  render() {
    const { active } = this.state;
    const { isPC } = this.props;
    return (
      <StaticQuery
        query={graphql`
          {
            site {
              siteMetadata {
                thirdParty {
                  headway
                }
              }
            }
          }
        `}
        render={({
          site: {
            siteMetadata: {
              thirdParty: { headway }
            }
          }
        }) => {
          if (headwayAccount === "") headwayAccount = headway;
          return (
            <>
              <Helmet>
                <script>
                  {`var HW_config = {
                      selector: "#changelog",
                      account:  "${headway}"
                    }`}
                </script>
                <script async src="https://cdn.headwayapp.co/widget.js" />
              </Helmet>
              <nav
                style={{ background: "linear-gradient(90deg,#6c63ff,#4641ff)" }}
                className="navbar is-fixed-top"
              >
                <div className="container">
                  <div className="navbar-brand">
                    <Link to="/" className="navbar-item">
                      <Logo />
                    </Link>
                    <span
                      className={`navbar-burger burger ${
                        active ? "is-active" : ""
                      }`}
                      data-target="navbar"
                      onClick={() => this.setState({ active: !active })}
                    >
                      <Hamburger />
                    </span>
                    {!isPC && <Notification />}
                  </div>
                  <div
                    id="navbar"
                    style={{ padding: 0 }}
                    className={`navbar-menu ${active ? "is-active" : ""}`}
                  >
                    <NavItems isPC={isPC} />
                  </div>
                </div>
              </nav>
            </>
          );
        }}
      />
    );
  }
}

export default Navbar;
