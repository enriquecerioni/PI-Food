import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByTitle } from "../redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipeByTitle(title));
    setTitle("");
    setCurrentPage(1);
  }

  return (
    <div className={styles.search}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search Recipe..."
          value={title}
          onChange={(e) => handleInput(e)}
        />
        <button className={styles.searchButton} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
