import React from "react";
import { useSelector } from "react-redux";
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

  const onChangeStep = (e) => {
    setState({
      ...state,
      step: e.target.value,
    });
  }

  const handleSelectChange = (e) => {
    setState({
      ...state,
      field: [...state.field, e.target.value],
    });
  };

  const handleAddStep = (step) => {
    setState({
      ...state,
      field: [...state.field, step],
      step: ""
    });
  }

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
              (state.field.length > 0 && state.value === true) ||
              state.value === null
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
          {state.field.map((d) => (
            <div>
              <button type="button" onClick={() => handleDelete(d)}>
                <p>{d} X</p>
              </button>
            </div>
          ))}
          <br />
          {state.field.length > 0 && state.value === true ? (
            <span className={styles.spanValid}>Correct Field</span>
          ) : state.value === null ? (
            <span className={styles.spanNeutral}>
              Please, complete the field
            </span>
          ) : (
            <span className={styles.spanError}>{legendError}</span>
          )}
        </div>
      ) : name === "steps" ? (
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
            id={name}
            className={`${
              (state.field.length > 0 && state.value === true) ||
              state.value === null
                ? styles.formValid
                : styles.formError
            } ${styles.inputCreate}`}
            value={state.step}
            onChange={onChangeStep}
            onKeyUp={validate}
            onBlur={validate}
            valid={state.value}
            placeholder={placeholder}
          /><br/>

          { state.step.length > 3 ?
            <button type="button" onClick={() => handleAddStep(state.step)}>ADD</button>
            :
            <span className={styles.spanError}>El paso de la receta debe contener al menos 4 caracteres</span>
          }
          {state.field.map((s) => (
            <div>
              <button type="button" onClick={() => handleDelete(s)}>
                <p>{s} X</p>
              </button>
            </div>
          ))}
          <br />
          {state.field.length > 0 && state.value === true ? (
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
