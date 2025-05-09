let recipes = [
    {
      id: 1,
      title: "Hot Milo",
      ingredients: ["Milo Powder", "Hot Milk"],
      prepTime: "2 mins",
    },
    {
      id: 2,
      title: "Peanut Butter Sandwich",
      ingredients: ["Peanut Butter", "Bread"],
      prepTime: "3 mins",
    },
  ];
  
  const getRecipeByIdFromService = (id) => {
    const recipe = recipes.find((r) => r.id === id);
    return recipe;
  };
  
  module.exports = {
    getRecipeByIdFromService,
  };