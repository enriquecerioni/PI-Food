import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { filterRecipeByDiet, FilterByCreate, orderByTitle, orderByScore, getRecipes } from "../redux/actions";


const Navbar = ({ setCurrentPage, setOrden }) => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

    function handleClick(e) {
      e.preventDefault();
      dispatch(getRecipes());
    }

  function handleFilterDiet(e) {
    e.preventDefault();
    dispatch(filterRecipeByDiet(e.target.value));
    setCurrentPage(1);
  }

    function handleFilterCreated(e) {
      e.preventDefault();
      dispatch(FilterByCreate(e.target.value));
    }

    function handleSort(e) {
      e.preventDefault();
      dispatch(orderByTitle(e.target.value));
      setCurrentPage(1);
      setOrden(`Ordenado ${e.target.value}`);
    }

    function handleSortScore(e) {
      e.preventDefault();
      dispatch(orderByScore(e.target.value));
      setCurrentPage(1);
      setOrden(`Ordenado ${e.target.value}`);
    }

  return (
    <div className={styles.boxNav}>
      <div>
        <button
          type="button"
          className={styles.reload}
            onClick={(e) => {
              handleClick(e);
            }}
        >
          Reload Recipes
        </button>
      </div>
      <div className={styles.create}>
        <Link to="/create_recipe" style={{ textDecoration: "none" }}>
          Create Recipe
        </Link>
      </div>
      <div>
        <select className={styles.selects} onChange={(e) => handleSort(e)}>
          <option>Order By Name</option>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>

        <select
          className={styles.selects}
            onChange={(e) => handleSortScore(e)}
        >
          <option>Order By Health-Score</option>
          <option value="score-asc">ASC</option>
          <option value="score-desc">DESC</option>
        </select>

        <select
          className={styles.selects}
            onChange={(e) => handleFilterCreated(e)}
        >
          <option>Filter By</option>
          <option value="All">All</option>
          <option value="created">Created</option>
          <option value="api">API</option>
        </select>

        <select
          className={styles.selects}
          onChange={(e) => handleFilterDiet(e)}
        >
          <option>Filter By Diet</option>
          <option value="All">All</option>
          {diets &&
            diets.map((diet) => {
              return <option value={diet.name}>{diet.name}</option>;
            })}
        </select>
      </div>
      <div>
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default Navbar;
