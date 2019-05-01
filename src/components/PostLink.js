import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

const PostLink = ({ thumbnail, title, date, link }) => (
  <>
    <Link to={link}>
      <article className="post">
        <PreviewCompatibleImage
          imageInfo={{
            image: thumbnail,
            alt: `${title}のサムネイル`
          }}
        />
        <div>
          <div>
            {date && <small>{date}</small>}
            <p style={{ minHeight: 100 }}>{title}</p>
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
