import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import withLayout from "../components/withLayout";
import PostList from "../components/PostList";

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
                <PostList posts={posts} />
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
