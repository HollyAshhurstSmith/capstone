
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastrContext } from "./ToastrContext";

export const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const { toastrDispatch } = useContext(ToastrContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/recipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSave = (recipeData, onSuccess) => {
    if (recipeData.id) {
      axios
        .put(`http://localhost:3001/recipes/${recipeData.id}`, recipeData)
        .then(() => {
          setRecipes((prev) =>
            prev.map((r) => (r.id === recipeData.id ? recipeData : r))
          );
          toastrDispatch({
            type: "showToastr",
            payload: {
              isOpen: true,
              severity: "success",
              message: "Recipe updated successfully!",
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
              message: "Failed to update recipe.",
            },
          });
        });
    } else {
      axios
        .post("http://localhost:3001/recipes", recipeData)
        .then((res) => {
          setRecipes((prev) => [...prev, res.data]);
          toastrDispatch({
            type: "showToastr",
            payload: {
              isOpen: true,
              severity: "success",
              message: "Recipe added successfully!",
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
              message: "Failed to add recipe.",
            },
          });
        });
    }
  };

  const handleDelete = (recipeId, onSuccess) => {
    axios
      .delete(`http://localhost:3001/recipes/${recipeId}`)
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
    <RecipesContext.Provider
      value={{ recipes, handleSave, handleDelete }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipesContext);
