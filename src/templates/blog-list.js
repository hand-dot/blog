import React from "react";
import { graphql } from "gatsby";
import Page from "../components/Page";
import withLayout from "../components/withLayout";
import PostLink from "../components/PostLink";
import Pagination from "../components/Pagination";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.edges;
    const { currentPage, numPages } = this.props.pageContext;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString();
    const nextPage = (currentPage + 1).toString();

    return (
      <Page
        title="Build house with JavaScript"
        description="hand-dotのブログへようこそ"
      >
        <>
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
          <Pagination
            prevPage={prevPage}
            numPages={numPages}
            currentPage={currentPage}
            nextPage={nextPage}
            isFirst={isFirst}
            isLast={isLast}
          />
        </>
      </Page>
    );
  }
}

export default withLayout(BlogIndex, "ブログ");

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
                fluid(maxWidth: 512, quality: 90) {
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
