import React from "react";

const Pagination = ({ articlesPerPage, totalArticles }) => {
  const pageNumbers = [];

  console.log(
    `per page: ${articlesPerPage}, total: ${totalArticles}, array before: ${pageNumbers}`
  );

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(`array after: ${pageNumbers}`);

  return (
    <div>
      <ul className="pagination">
        {" "}
        {pageNumbers.map((number) => {
          return (
            <>
              <li className="page-item" key={number}>
                <a href="//" className="page-link">
                  {number}
                </a>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
