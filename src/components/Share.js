import React from "react";
import PropTypes from "prop-types";
import {
  FacebookShareButton,
  TwitterShareButton,
  LineShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LineIcon,
  EmailIcon
} from "react-share";
import { DOMAIN } from "../constants";

const margin = { margin: "0.75rem 1rem" };

const Share = ({ url, center }) => (
  <div
    style={{
      display: "flex",
      justifyContent: center ? "center" : "flex-start"
    }}
  >
    <TwitterShareButton url={url} style={margin}>
      <TwitterIcon size={32} round />
    </TwitterShareButton>
    <FacebookShareButton url={url} style={margin}>
      <FacebookIcon size={32} round />
    </FacebookShareButton>
    <LineShareButton url={url} style={margin}>
      <LineIcon size={32} round />
    </LineShareButton>
    <EmailShareButton url={url} style={margin}>
      <EmailIcon size={32} round />
    </EmailShareButton>
  </div>
);

Share.propTypes = {
  url: PropTypes.string,
  center: PropTypes.bool
};

Share.defaultProps = {
  url: `https://${DOMAIN}`,
  center: false
};

export default Share;
