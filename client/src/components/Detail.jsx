import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../redux/actions";
import Loader from "./Loader";
import styles from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [dispatch, id]);

  const recipe = useSelector((state) => state.detail);

  return (
    <>
      {recipe.hasOwnProperty("title") ? (
        <div className={styles.boxDetail}>
          <h1>{recipe.title}</h1>
          <img
            src={recipe.image}
            alt="image not found"
            className={styles.imgDetail}
          />
          <div className={styles.textDetail}>
            <p>
              <strong>Tipo de Dietas:</strong>
              {recipe.diets.map((d) => d.name + ", ")}
            </p>
            <p>
              <strong>Descripción:</strong>
              {recipe.summary}
            </p>
            <p>
              <strong>Puntaje Saludable:</strong> {recipe.healthScore}
            </p>
            <p>
              <strong>Pasos de la Receta:</strong>
              {recipe.analizedInstructions ? recipe.analizedInstructions.map((s) => s + ", ") : recipe.steps[0].map((s) => s.step)}
            </p>
          </div>
          <Link to="/home">
            <button className={styles.button}>Go Back</button>
          </Link>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Detail;
