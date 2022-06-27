import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes, getDiets } from "../redux/actions";
// Component styles
import styles from "./Home.module.css";
// Components exported
import Card from "./Card";
import Loader from "./Loader";
import Paginate from "./Paginate";
import Navbar from "./Navbar";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  // Ordenamiento
  const [orden, setOrden] = useState("");
  // Paginado
  const [currentPage, setCurrentPage] = useState(1); // pagina inicial
  const [RecipesPerPage, setRecipesPerPage] = useState(9); // cantidad de videojuegos por pagina
  const indexLastRecipe = currentPage * RecipesPerPage; // inicialmente será igual a 15
  const indexFirstRecipe = indexLastRecipe - RecipesPerPage; // inicialmente será 0
  const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);
  const recipesShow = currentRecipes.map((r) => (
    <Link to={"/home/" + r.id} style={{ textDecoration: "none" }}>
      <Card
        title={r.title}
        image={r.image}
        diets={r.diets}
        id={r.id}
        key={r.id}
      />
    </Link>
  ));

  // Loader
  const [loading, setLoading] = useState(true);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(async () => {
    await dispatch(getRecipes());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div>
      <Navbar
        setCurrentPage={setCurrentPage}
        setOrden={setOrden}
        loading={loading}
        recipesShow={recipesShow}
      />

      <Paginate
        RecipesPerPage={RecipesPerPage}
        allRecipes={allRecipes.length}
        paginate={paginate}
      />

      {loading ? (
        <div className={styles.loading}>
          <Loader />
        </div>
      ) : (
        <div className={styles.cards}>{recipesShow}</div>
      )}
    </div>
  );
};

export default Home;
