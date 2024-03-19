import React from "react";
import "./PaginationStyles.scss";

const Pagination = ({
  articlesPerPage,
  totalArticles,
  currentPage,
  handlePaginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="pagination__list">
        {pageNumbers.map((number) => (
          <div
            className={`page-item ${
              number === currentPage ? "active-page" : ""
            }`}
            key={number}
          >
            <span className="page-link" onClick={() => handlePaginate(number)}>
              {number}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
