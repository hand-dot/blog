import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

const PostLink = ({ thumbnail, title, date, link }) => (
  <>
    <Link to={link}>
      <article style={{ color: "#4a4a4a" }}>
        {date && <small>{date}</small>}
        <PreviewCompatibleImage
          imageInfo={{
            image: thumbnail,
            alt: `${title}のサムネイル`
          }}
        />
        <div>
          <div>
            <p
              style={{ minHeight: 100 }}
              className="is-size-6 has-text-weight-light"
            >
              {title}
            </p>
          </div>
        </div>
      </article>
    </Link>
  </>
);

PostLink.propTypes = {
  thumbnail: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string,
  date: PropTypes.string,
  link: PropTypes.string
};

export default PostLink;
