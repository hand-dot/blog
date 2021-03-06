import React from "react";
import Helmet from "react-helmet";
import SEO from "./SEO/SEO";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { isPC } from "../util";
import { DOMAIN } from "../constants";
import "./all.sass";
import "./all.css";

export default (Component, title) => {
  return class extends React.Component {
    state = { isPC: isPC() };

    componentDidMount() {
      this.setState({ isPC: isPC() });
    }

    render() {
      const { isPC } = this.state;
      return (
        <div style={{ backgroundColor: "#d6ddff0d", paddingTop: 52 }}>
          <SEO />
          {title && <Helmet title={`${title} - ${DOMAIN}`} />}
          <Navbar isPC={isPC} />
          <Component {...this.props} {...this.state} />
          <Footer />
        </div>
      );
    }
  };
};
