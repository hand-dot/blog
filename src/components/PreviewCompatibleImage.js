import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import LazyLoad from "react-lazy-load";
import ImageLoader from "./ImageLoader";

const PreviewCompatibleImage = ({ imageInfo }) => {
  const { alt = "", childImageSharp, image, style = {} } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return <Img style={style} fluid={image.childImageSharp.fluid} alt={alt} />;
  }

  if (!!childImageSharp) {
    return <Img style={style} fluid={childImageSharp.fluid} alt={alt} />;
  }

  if (!!image && typeof image === "string") {
    return (
      <LazyLoad debounce={false} throttle={100}>
        <ImageLoader style={style} src={image} alt={alt} />
      </LazyLoad>
    );
  }
  return null;
};

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object
  }).isRequired
};

export default PreviewCompatibleImage;
