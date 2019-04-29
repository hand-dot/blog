import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import Divider from "./Divider";

const PostLink = ({
  thumbnail,
  title,
  date,
  link,
  divider = true
}) => (
  <>
    <Link to={link}>
      <article className="">
        <figure className=" ">
          <PreviewCompatibleImage
            imageInfo={{
              image: thumbnail,
              alt: `${title}のサムネイル`
            }}
          />
        </figure>
        <div className="">
          <div>
            <p>{title}</p>
            {date && (
              <>
                <span> &bull; </span>
                <small>{date}</small>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
    {divider && <Divider getterBottom />}
  </>
);

PostLink.propTypes = {
  thumbnail: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string,
  date: PropTypes.string,
  link: PropTypes.string,
};

export default PostLink;
