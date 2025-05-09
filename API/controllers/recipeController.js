const { Category } = require("@mui/icons-material");

let recipes = [
  {
    id: 1,
    title: "Hot Milo",
    ingredients: ["Milo Powder", "Hot Milk"],
    prepTime: "2 mins",
    method: "Warm up milk...", 
    imageUrl: "https://opendrinks.io/img/chocolate-milk.1147f9b8.jpg",
    // glutenFree: false,
    // dairyFree: false,
    // nutFree: true,
    // vegetarian: true,
    // vegan: false,
    // category: "beverage"
  },
  {
    id: 2,
    title: "Peanut Butter Sandwich",
    ingredients: ["Peanut Butter", "Bread"],
    prepTime: "3 mins",
    method: "spread peanutbutter on bread...", 
    imageUrl: "https://www.thetakeout.com/img/gallery/your-peanut-butter-sandwich-needs-more-depth-butter-is-the-answer/l-intro-1727106149.jpg",
    // glutenFree: false,
    // dairyFree: false,
    // nutFree: false,
    // vegetarian: true,
    // vegan: false,
    // category: "snack"
  },
  {
    id: 3,
    title: "Boiled Egg",
    ingredients: ["Egg"],
    prepTime: "2 mins",
    method: "Boil egg...", 
    imageUrl: "https://bittmanproject.com/wp-content/uploads/GettyImages-1309107688-hbeggs-scaled.jpg",
    // glutenFree: true,
    // dairyFree: true,
    // nutFree: true,
    // vegetarian: true,
    // vegan: false,
    // category: "snack"
  }
];

  //Logic for each endpoint.
  
  function getAllRecipes(req, res) {
    res.status(200).json(recipes);
  }
  
  function getRecipeById(req, res) {
    const id = parseInt(req.params.id); // pulls the ID from the route
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  }
  
  function createRecipe(req, res) {
    const newRecipe = {
      id: recipes.length + 1,
      ...req.body,
    };
    recipes.push(newRecipe);
    res.status(201).json(newRecipe); //adding new recipe with new identifier
  }
  
  function updateRecipe(req, res) {
    const id = parseInt(req.params.id);
    const index = recipes.findIndex((r) => r.id === id);
  
    if (index === -1) {
      // If recipe doesn't exist, create it
      const newRecipe = { id, ...req.body };
      recipes.push(newRecipe);
      res.status(201).json(newRecipe); // 201 Created
    } else {
      // Update existing recipe
      recipes[index] = { id, ...req.body };
      res.status(200).json(recipes[index]); // 200 OK
    }
  }
  
  function deleteRecipe(req, res) {
    const id = parseInt(req.params.id);
    const index = recipes.findIndex((r) => r.id === id);
    console.log(recipes[index]);
    // delete recipe
    if (index !== -1) {
      const deleted = recipes.splice(index, 1);
      res.status(200).json(deleted[0]);
  
      // If a resource does exist return a 404 (Not found) status code
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  }
  
  module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  };