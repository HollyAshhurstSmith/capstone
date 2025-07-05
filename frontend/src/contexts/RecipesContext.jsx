import { createContext, useContext, useEffect, useState } from "react";
import { ToastrContext } from "./ToastrContext";
import {
  fetchRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../services/recipeService";

export const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const { toastrDispatch } = useContext(ToastrContext);

  // Load recipes
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (err) {
        console.error(err);
        toastrDispatch({
          type: "showToastr",
          payload: {
            isOpen: true,
            severity: "error",
            message: "Failed to fetch recipes. Please log in.",
          },
        });
      }
    };

    loadRecipes();
  }, []);

  // Filter on search term
  useEffect(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [recipes, searchTerm]);

  // Save handler
  const handleSave = async (recipeData, onSuccess) => {
    try {
      let updated;

      if (recipeData.id) {
        updated = await updateRecipe(recipeData.id, recipeData);
        setRecipes((prev) =>
          prev.map((r) => (r.id === recipeData.id ? updated : r))
        );
      } else {
        updated = await createRecipe(recipeData);
        setRecipes((prev) => [...prev, updated]);
      }

      toastrDispatch({
        type: "showToastr",
        payload: {
          isOpen: true,
          severity: "success",
          message: recipeData.id ? "Recipe updated!" : "Recipe added!",
        },
      });

      onSuccess?.();
    } catch (err) {
      console.error(err);
      toastrDispatch({
        type: "showToastr",
        payload: {
          isOpen: true,
          severity: "error",
          message: recipeData.id ? "Update failed." : "Add failed.",
        },
      });
    }
  };

  // Delete handler
  const handleDelete = async (recipeId, onSuccess) => {
    try {
      await deleteRecipe(recipeId);
      setRecipes((prev) => prev.filter((r) => r.id !== recipeId));

      toastrDispatch({
        type: "showToastr",
        payload: {
          isOpen: true,
          severity: "info",
          message: "Recipe deleted.",
        },
      });

      onSuccess?.();
    } catch (err) {
      console.error(err);
      toastrDispatch({
        type: "showToastr",
        payload: {
          isOpen: true,
          severity: "error",
          message: "Failed to delete recipe.",
        },
      });
    }
  };

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        filteredRecipes,
        searchTerm,
        setSearchTerm,
        handleSave,
        handleDelete,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipesContext);