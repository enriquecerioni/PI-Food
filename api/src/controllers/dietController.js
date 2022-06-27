const { getDiets } = require("../queries/dietQueries");

exports.getAllDiets = async (req, res, next) => {
    try{
        let diets = await getDiets();
        res.json(diets)
      } catch (error) {
        next(error)
      }
}