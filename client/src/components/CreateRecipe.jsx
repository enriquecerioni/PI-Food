import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, postRecipe } from "../redux/actions";
import styles from "./CreateRecipe.module.css";
import Input from "./Input";

const CreateRecipe = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  const [title, setTitle] = useState({ field: "", value: null });
  const [summary, setSummary] = useState({ field: "", value: null });
  const [healthScore, setHealthScore] = useState({ field: "", value: null });
  const [image, setImage] = useState({ field: "", value: null });
  const [diets, setDiets] = useState({ field: [], value: null });
  const [steps, setSteps] = useState({ field: [], value: null, step: ""});
  const [formValid, setFormValid] = useState(null);

  const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      title.value === true &&
      summary.value === true &&
      healthScore.value === true &&
      image.value === true &&
      diets.value === true &&
      steps.value === true
    ) {
      dispatch(postRecipe({
        title: title.field,
        summary: summary.field,
        healthScore: healthScore.field,
        image: image.field,
        diets: diets.field,
        analizedInstructions: steps.field
      }))
      setFormValid(true);
      setTitle({ field: "", value: null });
      setSummary({ field: "", value: null });
      setHealthScore({ field: "", value: null });
      setImage({ field: "", value: null });
      setDiets({ field: [], value: null });
      setSteps({ field: [], value: null, step: ""});
    } else {
      setFormValid(false);
    }
  };

  return (
    <div className={styles.boxCreate}>
      <form className={styles.formCreate} onSubmit={onSubmit}>
        <Input
          state={title}
          setState={setTitle}
          label="Title"
          placeholder="Title recipe..."
          type="text"
          name="title"
          legendError="El titulo debe contener al menos 3 caracteres."
          regularExpression={expresiones.usuario}
        />

        <Input
          state={summary}
          setState={setSummary}
          label="Summary"
          placeholder="Detail recipe..."
          type="text"
          name="summary"
          legendError="El titulo debe contener al menos 3 caracteres."
          regularExpression={expresiones.usuario}
        />

        <Input
          state={healthScore}
          setState={setHealthScore}
          label="HealthScore"
          placeholder="Recipe Score..."
          type="number"
          name="healthScore"
          legendError="El titulo debe contener al menos 3 caracteres."
          regularExpression={expresiones.usuario}
        />

        <Input
          state={image}
          setState={setImage}
          label="Image"
          placeholder="Recipe Image...(optional)"
          type="text"
          name="image"
          legendError="El titulo debe contener al menos 3 caracteres."
          regularExpression={expresiones.usuario}
        />

        <Input
          state={diets}
          setState={setDiets}
          label="Diets"
          placeholder="Select diets..."
          type="text"
          name="diets"
          legendError="El titulo debe contener al menos 3 caracteres."
          regularExpression={expresiones.usuario}
        />

        <Input
          key={steps}
          state={steps}
          setState={setSteps}
          label="Steps"
          placeholder="Write the steps..."
          type="text"
          name="steps"
          legendError="El titulo debe contener al menos 3 caracteres."
          regularExpression={expresiones.usuario}
        />

        {/* <Input 
            label="Summary"
            placeholder="Detail Recipe..."
            type="text"
        /> */}

        {formValid === false && (
          <div className={styles.errorForm}>
            <p>
              <b>Error:</b> Por favor, completa el formulario correctamente.
            </p>
          </div>
        )}

        <div className={styles.divButtonCreate}>
          {title.value === true &&
            summary.value === true &&
            healthScore.value === true &&
            image.value === true &&
            diets.value === true && diets.field.length > 0 &&
            steps.value === true && steps.field.length > 0 && (
              <button type="submit" className={styles.buttonCreate}>
                Create Recipe
              </button>
            )}
          {/* {formValid && (
            <p className={styles.successMessage}>The recipe was created!</p>
          )} */}
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
