import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, postRecipe } from "../redux/actions";
import styles from "./CreateRecipe.module.css";
import Input from "./Input";

const CreateRecipe = () => {

    const [title, setTitle] = useState({contain: '', value: null})

  return (
    <div className={styles.boxCreate}>
      <form action="" className={styles.formCreate}>
        <Input 
            label="Title"
            placeholder="Title recipe..."
            type="text"
            name="title"
            legendError="El titulo debe contener al menos 3 caracteres."
            regularExpression=""
        />
        
        <Input 
            label="Summary"
            placeholder="Detail Recipe..."
            type="text"
        />

        { false && 
          <div className={styles.errorForm}>
            <p>
              <b>Error:</b> Por favor, completa el formulario correctamente.
            </p>
          </div>
        }

        <div className={styles.divButtonCreate}>
          <button type="submit" className={styles.buttonCreate}>
            Create Recipe
          </button>
          <p className={styles.successMessage}>The recipe was created!</p>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
