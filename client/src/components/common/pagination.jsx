import React from "react";

const Pagination = (props) => {
  const { recipesCount, pageSize } = props;

  const pagesCount = recipesCount / pageSize;
  // [1 ... pagesCount].map()

  return (
    <nav aria-label="My Recipes pagination">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link">1</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
