import React, { useState } from "react";
import {
  Grid,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  Container,
  Stack,
} from "@mui/material";

import RecipeCard from "../components/RecipeCard";
import EditRecipeModal from "../components/EditRecipeModal";
import { useRecipes } from "../contexts/RecipesContext";
import { useModal } from "../contexts/ModalContext"; // Using unified modal context

function Home() {
  const { recipes, handleSave, handleDelete } = useRecipes();

  const {
    isModalOpen,
    selectedRecipe,
    openEditModal,
    closeEditModal,
    deleteConfirmOpen,
    recipeToDelete,
    openDeleteDialog,
    closeDeleteDialog,
  } = useModal();

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmDelete = () => {
    if (!recipeToDelete) return;
    handleDelete(recipeToDelete.id, () => {
      closeDeleteDialog();
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Search, Filter & Add Recipe Controls */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          mb: 3,
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingTop: "64px",
        }}
      >
        <TextField
          label="Search by title"
          variant="outlined"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchTerm(searchInput);
            }
          }}
          sx={{ flexGrow: 1, minWidth: "200px" }}
        />

        <Button variant="outlined" onClick={() => setSearchTerm(searchInput)}>
          Search
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            setSearchInput("");
            setSearchTerm("");
          }}
        >
          All Recipes
        </Button>

        <Button variant="contained" onClick={() => openEditModal(null)}>
          Add Recipe
        </Button>
      </Stack>

      {/* Recipes Grid */}
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="flex-start"
          sx={{ width: "100%", maxWidth: 1200 }}
        >
          {filteredRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <RecipeCard
                recipe={recipe}
                onEdit={() => openEditModal(recipe)}
                onDelete={() => openDeleteDialog(recipe)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Edit/Add Modal */}
      <EditRecipeModal
        open={isModalOpen}
        onClose={closeEditModal}
        onSave={(data) => handleSave(data, closeEditModal)}
        recipe={selectedRecipe}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={closeDeleteDialog}>
        <DialogTitle>
          Are you sure you want to delete "{recipeToDelete?.title}"?
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Home;
