const {
  getAllRecipes,
  getRecipeByIdAPI,
  getRecipeByIdBD,
  createRecipe
} = require("../queries/recipeQueries");

exports.getRecipes = async (req, res, next) => {
  try {
    // search recipe
    const { recipe } = req.query;
    allRecipes = await getAllRecipes();

    if (recipe) {
      let recipeFound = allRecipes.filter((r) =>
        r.title?.toLowerCase().includes(recipe.toString().toLowerCase())
      );
      if (recipeFound.length > 0) {
        res.status(200).send(recipeFound);
      } else {
        res.status(404).send("Recipe Not Found.");
      }

      // all recipes
    } else {
      res.json(allRecipes);
    }
  } catch (error) {
    next(error);
  }
};

exports.getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (Boolean(Number(id))) {
      const recipeDetail = await getRecipeByIdAPI(id);
      if (!recipeDetail) {
        res.status(404).json("No recipe under that ID.");
      }
      res.status(200).json(recipeDetail);
    } else {
      const recipeDetail = await getRecipeByIdBD(id);
      if (!recipeDetail) {
        res.status(404).json("No recipe under that ID in Database.");
      }
      res.status(200).json(recipeDetail);
    }
  } catch (error) {
    next(error);
  }
};

exports.postRecipe = async (req, res, next) => {
  try {
    const { title, summary, healthScore, steps, image, diets } = req.body;
    const recipeCreated = await createRecipe(title, summary, healthScore, steps, image, diets);
    res.status(201).json(`The recipe was created.`);
  } catch (error) {
    res.status(404).json(error);
  }
};
