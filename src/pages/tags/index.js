import React from "react";
import kebabCase from "lodash/kebabCase";
import { Link, graphql } from "gatsby";
import Page from "../../components/Page";
import withLayout from "../../components/withLayout";

const TagsPage = ({
  data: {
    allMarkdownRemark: { group }
  }
}) => (
  <Page
    title="About"
    description="開発スキルやサブプロジェクトを記載しています。"
  >
    <ul className="taglist">
      {group.map(tag => (
        <li key={tag.fieldValue}>
          <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        </li>
      ))}
    </ul>
  </Page>
);

export default withLayout(TagsPage, "タグ");

export const tagPageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
