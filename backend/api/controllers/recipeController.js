const recipeService = require('../services/recipeService');

async function getAllRecipes(req, res) {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
}

async function getRecipeById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const recipe = await recipeService.getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving recipe' });
  }
}

async function createRecipe(req, res) {
  try {
    const newRecipe = await recipeService.createRecipe(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: 'Error creating recipe' });
  }
}

async function updateRecipe(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await recipeService.updateOrCreateRecipe(id, req.body);
    res.status(result.created ? 201 : 200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error updating recipe' });
  }
}

async function deleteRecipe(req, res) {
  try {
    const id = parseInt(req.params.id);
    const deleted = await recipeService.deleteRecipe(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ error: 'Error deleting recipe' });
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
