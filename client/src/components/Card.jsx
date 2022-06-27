import React from "react";
import styles from "./Card.module.css";

const Card = ({title, image, diets}) => {
    // const genres = genre.map(g =><p>{g.name}</p>);
    return (
        <div className={styles.card}>
            <img src={image} alt="img not found" className={styles.image}/>
            <h3>{title}</h3>
            <p>| {diets.map(d => d.name + ' | ')}</p>
        </div>
    )
}

export default Card;