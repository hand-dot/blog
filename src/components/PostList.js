import React from "react";
import PropTypes from "prop-types";
import PostLink from "./PostLink";

const PostList = ({ posts }) => (
  <>
    {posts
      .reduce(
        (table, item) => {
          const last = table[table.length - 1];
          if (last.length === 2) {
            table.push([item]);
            return table;
          }
          last.push(item);
          return table;
        },
        [[]]
      )
      .map(items => (
        <div className="columns" key={JSON.stringify(items[0])}>
          {items.map(({ node: post }) => (
            <div className="column" key={post.fields.slug}>
              <PostLink
                thumbnail={post.frontmatter.thumbnail}
                title={post.frontmatter.title}
                date={post.frontmatter.date}
                link={post.fields.slug}
              />
            </div>
          ))}
        </div>
      ))}
  </>
);

PostList.propTypes = {
  posts: PropTypes.array
};

export default PostList;
