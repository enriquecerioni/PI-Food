import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets } from "../redux/actions";
import styles from "./Input.module.css";

const Input = ({
  state,
  setState,
  label,
  placeholder,
  type,
  name,
  legendError,
  regularExpression,
}) => {
  const allDiets = useSelector((state) => state.diets);

  const onChange = (e) => {
    setState({
      ...state,
      field: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    setState({
      ...state,
      field: [...state.field, e.target.value],
    });
  };

  function handleDelete(e) {
    setState({
      ...state,
      field: state.field.filter((st) => st !== e),
    });
  }

  const validate = () => {
    if (regularExpression) {
      if (regularExpression.test(state.field)) {
        setState({
          ...state,
          value: true,
        });
      } else if (Array.isArray(state.field) && state.field.length > 0) {
        setState({
          ...state,
          value: true,
        });
      } else {
        setState({
          ...state,
          value: false,
        });
      }
    }
  };

  return (
    <>
      {name === "diets" ? (
        <div>
          <label
            htmlFor={name}
            className={`${
              state.value === false ? styles.formLabelError : styles.formLabel
            }`}
          >
            {label}
          </label>
          <select
            type={type}
            id={name}
            className={`${
              state.field.length > 0 && state.value === true || state.value === null
                ? styles.formValid
                : styles.formError
            } ${styles.inputCreate}`}
            value={state.field}
            onChange={handleSelectChange}
            onKeyUp={validate}
            onBlur={validate}
            valid={state.value}
          >
            {allDiets.map((d) => {
              return <option value={d.name}>{d.name}</option>;
            })}
          </select>
          {state.field.map((g) => (
            <div>
              <button type="button" onClick={() => handleDelete(g)}>
                <p>{g} X</p>
              </button>
            </div>
          ))}
          <br />
          { state.field.length > 0 && state.value === true  ? (
            <span className={styles.spanValid}>Correct Field</span>
          ) : state.value === null ? (
            <span className={styles.spanNeutral}>
              Please, complete the field
            </span>
          ) : (
            <span className={styles.spanError}>{legendError}</span>
          )}
        </div>
      ) : (
        <div>
          <label
            htmlFor={name}
            className={`${
              state.value === false ? styles.formLabelError : styles.formLabel
            }`}
          >
            {label}
          </label>
          <input
            type={type}
            placeholder={placeholder}
            id={name}
            className={`${
              state.value === true || state.value === null
                ? styles.formValid
                : styles.formError
            } ${styles.inputCreate}`}
            value={state.field}
            onChange={onChange}
            onKeyUp={validate}
            onBlur={validate}
            valid={state.value}
          />
          <br />
          {state.value === true ? (
            <span className={styles.spanValid}>Correct Field</span>
          ) : state.value === null ? (
            <span className={styles.spanNeutral}>
              Please, complete the field
            </span>
          ) : (
            <span className={styles.spanError}>{legendError}</span>
          )}
        </div>
      )}
    </>
  );
};

export default Input;
