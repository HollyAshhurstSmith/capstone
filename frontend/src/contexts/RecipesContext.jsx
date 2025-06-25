import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastrContext } from "./ToastrContext";

export const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const { toastrDispatch } = useContext(ToastrContext);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/recipes", getAuthHeaders())
      .then((res) => setRecipes(res.data))
      .catch((err) => {
        console.error(err);
        toastrDispatch({
          type: "showToastr",
          payload: {
            isOpen: true,
            severity: "error",
            message: "Failed to fetch recipes. Please log in.",
          },
        });
      });
  }, []);

  const handleSave = (recipeData, onSuccess) => {
    const request = recipeData.id
      ? axios.put(`http://localhost:3001/recipes/${recipeData.id}`, recipeData, getAuthHeaders())
      : axios.post("http://localhost:3001/recipes", recipeData, getAuthHeaders());

    request
      .then((res) => {
        setRecipes((prev) =>
          recipeData.id
            ? prev.map((r) => (r.id === recipeData.id ? recipeData : r))
            : [...prev, res.data]
        );
        toastrDispatch({
          type: "showToastr",
          payload: {
            isOpen: true,
            severity: "success",
            message: recipeData.id ? "Recipe updated!" : "Recipe added!",
          },
        });
        onSuccess?.();
      })
      .catch(() => {
        toastrDispatch({
          type: "showToastr",
          payload: {
            isOpen: true,
            severity: "error",
            message: recipeData.id ? "Update failed." : "Add failed.",
          },
        });
      });
  };

  const handleDelete = (recipeId, onSuccess) => {
    axios
      .delete(`http://localhost:3001/recipes/${recipeId}`, getAuthHeaders())
      .then(() => {
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
      })
      .catch(() => {
        toastrDispatch({
          type: "showToastr",
          payload: {
            isOpen: true,
            severity: "error",
            message: "Failed to delete recipe.",
          },
        });
      });
  };

  return (
    <RecipesContext.Provider value={{ recipes, handleSave, handleDelete }}>
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipesContext);