const axios = require("axios");
const { Diet } = require("../db");
const { API_KEY } = process.env;
exports.getDiets = async () => {
  const dietsData = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  var dietTypes = [];

  await dietsData.data.results.forEach((result) => {
    result.diets.forEach((result) => {
      if (!dietTypes.includes(result)) {
        dietTypes.push(result);
      }
    });
  });
  for (let i = 0; i < dietTypes.length; i++) {
    await Diet.findOrCreate({
      where: {
        name: dietTypes[i],
      },
    });
  }
  let dietResults = await Diet.findAll();
  return dietResults;
};
