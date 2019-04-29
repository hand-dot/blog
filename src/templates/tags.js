import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import withLayout from "../components/withLayout";
import PostLink from "../components/PostLink";

class TagRoute extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `“${tag}”のタグがつけられた記事が${totalCount}件あります。`;

    return (
      <>
        <section className="section" style={{ marginTop: 52 }}>
          <Helmet title={`${tag} - ${title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10 is-offset-1"
                style={{ marginBottom: "6rem" }}
              >
                <h3 className="title is-size-4 is-bold-light">{tagHeader}</h3>
                {posts.map(({ node: post }) => (
                  <PostLink
                    key={post.fields.slug}
                    thumbnail={post.frontmatter.thumbnail}
                    title={post.frontmatter.title}
                    date={post.frontmatter.date}
                    description={post.frontmatter.description}
                    link={post.fields.slug}
                    linkText="続きを読む"
                  />
                ))}
                <p style={{ marginTop: "1.5rem" }}>
                  <Link to="/tags/">全てのタグを見る</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default withLayout(TagRoute);

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
            templateKey
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 128, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            date(formatString: "YYYY/MM/DD")
          }
        }
      }
    }
  }
`;
