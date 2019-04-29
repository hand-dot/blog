import React from "react";
import { Link } from "gatsby";

const Pagination = ({
  prevPage,
  numPages,
  currentPage,
  nextPage,
  isFirst,
  isLast
}) => (
  <ul
    className="field has-addons"
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      listStyle: "none",
      padding: 0,
      maxWidth: 500,
      margin: "0 auto"
    }}
  >
    {!isFirst && (
      <div className="control">
        <Link className="button" to={`/${prevPage}`} rel="prev">
          ⬅
        </Link>
      </div>
    )}
    {Array.from({ length: numPages }, (_, i) => (
      <div className="control" key={i}>
        <li
          key={`pagination-number${i + 1}`}
          style={{
            margin: 0
          }}
        >
          <Link
            to={`/${i === 0 ? "" : i + 1}`}
            className={`button ${i + 1 === currentPage ? "is-link" : ""}`}
          >
            {i + 1}
          </Link>
        </li>
      </div>
    ))}
    {!isLast && (
      <div className="control">
        <Link className="button" to={`/${nextPage}`} rel="next">
          ➡︎
        </Link>
      </div>
    )}
  </ul>
);

export default Pagination;
