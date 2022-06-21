const { getDiets } = require("../queries/dietQueries");

exports.getAllDiets = async (req, res, next) => {
    try{
        const diets = getDiets();
        res.send(diets)
      } catch (error) {
        next(error)
      }
}