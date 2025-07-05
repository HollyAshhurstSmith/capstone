const Recipe = require('../models/recipe');

async function getAllRecipes() {
  return await Recipe.findAll();
}

async function getRecipeById(id) {
  return await Recipe.findByPk(id);
}

async function createRecipe(data) {
  //could validate required fields here (e.g., title, ingredients)
  return await Recipe.create(data);
}

async function updateOrCreateRecipe(id, data) {
  const [updated] = await Recipe.update(data, { where: { id } });
  return updated
    ? await Recipe.findByPk(id)
    : await Recipe.create({ id, ...data });
}

async function deleteRecipe(id) {
  const recipe = await Recipe.findByPk(id);
  if (!recipe) return null;

  await recipe.destroy();
  return recipe;
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateOrCreateRecipe,
  deleteRecipe,
};