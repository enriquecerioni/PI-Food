import axios from "axios";

//actions types
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const GET_RECIPE_BY_TITLE = "GET_RECIPE_BY_TITLE";
export const FILTER_RECIPE_BY_DIET = "FILTER_RECIPE_BY_DIET";
export const ORDER_BY_TITLE = "ORDER_BY_TITLE";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const FILTER_BY_CREATE = "FILTER_BY_CREATE"

//actions
export function getRecipes(){
    return async function(dispatch){
        const obj = await axios.get("http://localhost:3001/recipes")
        return dispatch({
            type: GET_ALL_RECIPES,
            payload: obj.data
        })
    }
}

export function getRecipeById(id){
    return async function(dispatch){
        const obj = await axios.get(`http://localhost:3001/recipes/${id}`)
        return dispatch({
            type: GET_RECIPE_BY_ID,
            payload: obj.data
        })
    }
}

export function getRecipeByTitle(payload){
    return {
        type: GET_RECIPE_BY_TITLE,
        payload
    }
}

export function getDiets(){
    return async function(dispatch){
        const obj = await axios.get("http://localhost:3001/diets")
        return dispatch({
            type: GET_ALL_DIETS,
            payload: obj.data
        })
    }
}

export function filterRecipeByDiet(payload){
    return {
        type: FILTER_RECIPE_BY_DIET,
        payload // dieta recibida por el select
    }
}

export function FilterByCreate(payload){
    return {
        type: FILTER_BY_CREATE,
        payload
    }
}

export function orderByTitle(payload){
    return {
        type: ORDER_BY_TITLE,
        payload
    }
}

export function orderByScore(payload){
    return {
        type: ORDER_BY_SCORE,
        payload
    }
}
