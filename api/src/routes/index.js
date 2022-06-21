const { Router } = require('express');
const { getAllDiets } = require('../controllers/dietController');
const { getRecipes, getRecipeById, postRecipe } = require('../controllers/recipeController');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// RECIPES
router.get('/recipes', getRecipes);
router.get('/recipes/:id', getRecipeById);
router.post('/recipes', postRecipe);

// // DIETS
router.get('/diets', getAllDiets);

module.exports = router;
