// import actions types
import {
  GET_ALL_RECIPES,
  GET_ALL_DIETS,
  GET_RECIPE_BY_ID,
  GET_RECIPE_BY_TITLE,
  FILTER_RECIPE_BY_DIET,
  ORDER_BY_TITLE,
  ORDER_BY_SCORE,
  FILTER_BY_CREATE,
} from "../actions";
// initial state
const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: {},
};
// reducer
// action is an object that contains the properties "type" and "payload"
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
        detail: {},
      };
    case GET_ALL_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case GET_RECIPE_BY_ID:
      return {
        ...state,
        detail: action.payload
      }
    case GET_RECIPE_BY_TITLE:
      const recipesFound = state.allRecipes.filter(r => r.title.toLowerCase().includes(action.payload.toLowerCase()))
      if(recipesFound.length > 0){
        return {
          ...state,
          recipes: recipesFound
        }
      }else{
        alert("Recipe Not Found");
        return {
          ...state,
          recipes: state.allRecipes
        }
      }
      
    case FILTER_RECIPE_BY_DIET:
      const allRecipes = state.allRecipes;
      const dietFiltered =
        action.payload === "All"
          ? allRecipes
          : allRecipes.filter((r) => {
              for (let i = 0; i < r.diets.length; i++) {
                if (r.diets[i].name === action.payload) {
                  return r;
                }
              }
            });
      return {
        ...state,
        recipes: dietFiltered,
      };
    case FILTER_BY_CREATE:
      const totalRecipes = state.allRecipes
      const recipesFiltered = action.payload === "created" ? totalRecipes.filter(r => r.mine) : totalRecipes.filter(r => !r.mine);
      return {
        ...state,
        recipes: action.payload === "All" ? state.allRecipes : recipesFiltered
      }
    case ORDER_BY_TITLE:
      let recipesSorted =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: recipesSorted,
      };
    case ORDER_BY_SCORE:
      let recipesSortedByScore =
        action.payload === "score-asc"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: recipesSortedByScore,
      };
    default:
      return state;
  }
}

export default rootReducer;
