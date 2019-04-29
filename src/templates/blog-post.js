import React from "react";
import PropTypes from "prop-types";
import kebabCase from "lodash/kebabCase";
import { graphql, Link } from "gatsby";
import withLayout from "../components/withLayout";
import SEO from "../components/SEO/SEO";
import Divider from "../components/Divider";
import Share from "../components/Share";
import Content, { HTMLContent } from "../components/Content";

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
        <section className="section" style={{ marginTop: 52 }}>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="blog content">
                <h1
                  className="title has-text-weight-nomal is-size-4"
                  style={{
                    paddingBottom: "1rem",
                    borderBottom:
                      "2px solid #6c63ff"
                  }}
                >
                  {title}
                </h1>
                <p>{date}</p>
                <p>{description}</p>
                <PostContent content={content} />
                <p style={{ textAlign: "center", margin: `4rem` }}>...</p>
                {/* share */}
                <div style={{ marginTop: `2rem` }}>
                  <h4>シェア</h4>
                  <Share url={encodeURI(url)} />
                </div>
                <Divider getterBottom />
                {/* tag */}
                {tags && tags.length ? (
                  <div style={{ marginTop: `2rem` }}>
                    <h4>タグ</h4>
                    <ul className="taglist">
                      {tags.map(tag => (
                        <li key={tag + `tag`}>
                          <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
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
