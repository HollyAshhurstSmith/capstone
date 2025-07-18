const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const authenticateToken = require('../middleware/authMiddleware');

// Apply to all routes in this router
router.use(authenticateToken);

router.get("/", recipeController.getAllRecipes);
router.get("/:id", recipeController.getRecipeById);
router.post("/", recipeController.createRecipe);
router.put("/:id", recipeController.updateRecipe);
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;

//Defines endpoints and maps them to controller functions.