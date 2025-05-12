import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  const openEditModal = (recipe = null) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedRecipe(null);
    setIsModalOpen(false);
  };

  const openDeleteDialog = (recipe) => {
    setRecipeToDelete(recipe);
    setDeleteConfirmOpen(true);
  };

  const closeDeleteDialog = () => {
    setRecipeToDelete(null);
    setDeleteConfirmOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        selectedRecipe,
        deleteConfirmOpen,
        recipeToDelete,
        openEditModal,
        closeEditModal,
        openDeleteDialog,
        closeDeleteDialog,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
