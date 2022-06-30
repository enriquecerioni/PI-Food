import React from "react";
import styles from "./CreateRecipe.module.css";

const Input = ({label, placeholder, type, name, legendError, regularExpression}) => {
  return (
    <div>
      <label htmlFor="title" className={styles.formLabel}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id="title"
        className={styles.inputCreate}
      />
      <br />
      <span className={styles.spanError}>Lorem ipsum dolor sit.</span>
    </div>
  );
};

export default Input;
