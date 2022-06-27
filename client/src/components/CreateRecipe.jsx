import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getDiets, postRecipe } from "../redux/actions";
import styles from "./CreateRecipe.module.css";

const CreateRecipe = () => {
    return (
        <div>
            <h1>CREATE RECIPE</h1>
        </div>
    )
}

export default CreateRecipe;