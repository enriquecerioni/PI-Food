import React from "react";
import styles from "./Paginate.module.css";

const Paginate = ({ RecipesPerPage, allRecipes, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / RecipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.paginate}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li
              className={styles.ulPaginate}
              key={number}
              onClick={() => paginate(number)}
            >
              <a>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Paginate;
