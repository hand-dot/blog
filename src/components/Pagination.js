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
      justifyContent: "space-around",
      alignItems: "center",
      listStyle: "none",
      padding: 0,
      maxWidth: 500,
      margin: "0 auto"
    }}
  >
    {!isFirst && (
      <Link style={{ color: "#4a4a4a" }} to={`/${prevPage}`} rel="prev">
        {`«`}
      </Link>
    )}
    {Array.from({ length: numPages }, (_, i) => (
      <Link
        key={i}
        to={`/${i === 0 ? "" : i + 1}`}
        style={{ color: ` ${i + 1 === currentPage ? "#a1a1a1" : "#4a4a4a"}` }}
      >
        {i + 1}
      </Link>
    ))}
    {!isLast && (
      <Link style={{ color: "#4a4a4a" }} to={`/${nextPage}`} rel="next">
        {`»`}
      </Link>
    )}
  </ul>
);

export default Pagination;
