import React from "react";
import PropTypes from "prop-types";
import kebabCase from "lodash/kebabCase";
import { graphql, Link } from "gatsby";
import withLayout from "../components/withLayout";
import SEO from "../components/SEO/SEO";
import Divider from "../components/Divider";
import Share from "../components/Share";
import Content, { HTMLContent } from "../components/Content";

const tagStyle = {
  display: "inline-block",
  padding: "6pt 10pt",
  marginRight: "0.5rem",
  lineHeight: 1.7,
  border: "1px solid #6c63ff",
  color: "#6c63ff",
  fontWeight: 200,
  fontSize: "small",
  whiteSpace: "nowrap",
  cursor: "pointer",
  backgroundColor: "transparent",
  borderRadius: "30px",
  marginBottom: "1.3em",
  transition: ".7s",
  textAlign: "center",
  textDecoration: "none"
};

export const BlogPostTemplate = ({
  content,
  url,
  contentComponent,
  description,
  tags,
  title,
  date,
  helmet
}) => {
  const PostContent = contentComponent || Content;
  return (
    <>
      {helmet || ""}
      <div className="container">
        <section className="section" style={{ marginTop: 30 }}>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="blog content">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end"
                  }}
                >
                  <p style={{ marginBottom: 0, marginRight: "1rem" }}>{date}</p>
                  {/* tag */}
                  {tags && tags.length ? (
                    <ul className="taglist" style={{ marginTop: "1rem" }}>
                      {tags.map(tag => (
                        <Link key={tag} to={`/tags/${kebabCase(tag)}/`}>
                          <li style={tagStyle}>{tag}</li>
                        </Link>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <h1
                  className="title is-size-4"
                  style={{
                    paddingBottom: "1rem",
                    borderBottom: "1px solid",
                    borderImage:
                      "linear-gradient(to right, #6c63ff 0%, #4641ff 100%)",
                    borderImageSlice: 1
                  }}
                >
                  {title}
                </h1>

                <p>{description}</p>
                <PostContent content={content} />
                <p style={{ textAlign: "center", margin: `4rem` }}>...</p>
                {/* share */}
                <div style={{ marginTop: `2rem` }}>
                  <h4 className="is-size-5 has-text-weight-light">Share</h4>
                  <Share url={encodeURI(url)} />
                </div>
                <Divider getterBottom />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  url: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  helmet: PropTypes.object
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post, site } = data;
  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      url={site.siteMetadata.canonicalUrl + post.fields.slug}
      description={post.frontmatter.description}
      helmet={
        <SEO
          isBlogPost
          postData={{
            childMarkdownRemark: post,
            excerpt: post.excerpt
          }}
          postImage={post.frontmatter.thumbnail.childImageSharp.fluid.src}
        />
      }
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
      date={post.frontmatter.date}
    />
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default withLayout(BlogPost);

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    site {
      siteMetadata {
        canonicalUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 200)
      fields {
        slug
      }
      frontmatter {
        date(formatString: "YYYY/MM/DD")
        title
        description
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 512, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        tags
      }
    }
  }
`;
