const Recipe = require('../models/recipe');

// Get all recipes
async function getAllRecipes(req, res) {
  try {
    const recipes = await Recipe.findAll();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get recipe by ID
async function getRecipeById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const recipe = await Recipe.findByPk(id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Create a new recipe
async function createRecipe(req, res) {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update an existing recipe or create if it doesn't exist
async function updateRecipe(req, res) {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await Recipe.update(req.body, {
      where: { id }
    });

    if (updated) {
      const updatedRecipe = await Recipe.findByPk(id);
      return res.status(200).json(updatedRecipe);
    } else {
      const newRecipe = await Recipe.create({ id, ...req.body });
      return res.status(201).json(newRecipe);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete a recipe
async function deleteRecipe(req, res) {
  try {
    const id = parseInt(req.params.id);
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    await recipe.destroy();
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};