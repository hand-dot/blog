import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import Divider from "./Divider";

const PostLink = ({
  thumbnail,
  title,
  date,
  description,
  link,
  linkText,
  divider = true
}) => (
  <>
    <article className="columns">
      <figure className="column is-one-third">
        <Link to={link}>
          <PreviewCompatibleImage
            imageInfo={{
              image: thumbnail,
              alt: `${title}のサムネイル`
            }}
          />
        </Link>
      </figure>
      <div className="column">
        <div>
          <strong>
            <Link to={link}>
              {title}
            </Link>
          </strong>
          {date && (
            <>
              <span> &bull; </span>
              <small>{date}</small>
            </>
          )}
          <br />
          <div className="is-size-7">{description}</div>
          <br />
          <Link className="button is-success is-small" to={link}>
            {linkText}
          </Link>
        </div>
      </div>
    </article>
    {divider && <Divider getterBottom />}
  </>
);

PostLink.propTypes = {
  thumbnail: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  link: PropTypes.string,
  linkText: PropTypes.string
};

export default PostLink;
