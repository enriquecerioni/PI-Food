const axios = require("axios");
const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

// FIND ALL RECIPES
exports.getAllRecipes = async () => {
  const apiRecipes = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&numer=10&addRecipeInformation=true`
  );
  const recipeInfo = await apiRecipes.data?.results.map((e) => {
    return {
      id: e.id,
      title: e.title,
      summary: e.summary,
      healthScore: e.healthScore,
      image: e.image,
      diets: e.diets.map((e) => {
        return { name: e };
      }),
      steps: e.analyzedInstructions[0]?.steps.map((e) => {
        return e.step;
      }),
    };
  });

  const dbRecipes = async () => {
    return await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  };

  const DBInfo = await dbRecipes();

  const recipes = DBInfo.concat(recipeInfo);
  return recipes;
};

exports.getRecipeByIdAPI = async (id) => {
  try {
    const recipeById = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&number=10`
    );

    const recipe = recipeById.data;

    return {
      id: recipe.id,
      title: recipe.title,
      summary: recipe.summary.replace(/<[^>]*>?/g, ""),
      healthScore: recipe.healthScore,
      image: recipe.image,
      diets: recipe.diets.map((e) => {
        return { name: e };
      }),
    };
  } catch (error) {
    return undefined;
  }
};

exports.getRecipeByIdBD = async (id) => {
  try {
    const recipeDB = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return recipeDB;
  } catch (error) {
    return undefined;
  }
};

exports.createRecipe = async (title, summary, healthScore, steps, image, diets) => {
  let newRecipe = await Recipe.create({
    title,
    summary,
    healthScore,
    analyzedInstructions:steps,
    image,
  });

  diets?.forEach(async(diet) => {
    let dietFound = await Diet.findOne({
        where: {
            name: diet,
        }
    })
    newRecipe.addDiet(dietFound);
});
};
