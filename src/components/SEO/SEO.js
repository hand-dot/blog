import path from "path";
import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import get from "lodash/get";
import PropTypes from "prop-types";
import favicon from "../../img/favicon.png";
import SchemaOrg from "./SchemaOrg";

const SEO = ({ postData, postImage, isBlogPost }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            lang
            title
            description
            canonicalUrl
            image
            author {
              name
            }
            organization {
              name
              url
              logo
            }
            social {
              twitter
              fbAppID
            }
          }
        }
      }
    `}
    render={({ site: { siteMetadata: seo } }) => {
      const postMeta = postData.childMarkdownRemark.frontmatter || {};
      const title = postMeta.title || seo.title;
      const description =
        postMeta.description || postData.excerpt || seo.description;
      const image = postImage ? `${seo.canonicalUrl}${postImage}` : seo.image;
      const slug = get(postData, "childMarkdownRemark.fields.slug");
      const url = slug
        ? `${seo.canonicalUrl}${path.sep}${slug}`
        : seo.canonicalUrl;
      const datePublished = isBlogPost ? postMeta.date : false;
      return (
        <React.Fragment>
          <Helmet>
            {/* General tags */}
            <html lang={seo.lang} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="shortcut icon" type="image/png" href={favicon} />
            <meta name="image" content={image} />
            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            <meta
              property="og:type"
              content={isBlogPost ? "article" : "website"}
            />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="fb:app_id" content={seo.social.fbAppID} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={seo.social.twitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
          </Helmet>
          <SchemaOrg
            isBlogPost={isBlogPost}
            url={url}
            title={title}
            image={image}
            description={description}
            datePublished={datePublished}
            canonicalUrl={seo.canonicalUrl}
            author={seo.author}
            organization={seo.organization}
            defaultTitle={seo.defaultTitle}
          />
        </React.Fragment>
      );
    }}
  />
);

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.any,
      excerpt: PropTypes.any
    })
  }),
  postImage: PropTypes.string
};

SEO.defaultProps = {
  isBlogPost: false,
  postData: { childMarkdownRemark: {} },
  postImage: null
};

export default SEO;
