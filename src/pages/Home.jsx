import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import EditRecipeModal from '../components/EditRecipeModal';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success'); // 'success' | 'error' | 'info' | 'warning'


  useEffect(() => {
    axios.get('http://localhost:3001/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleEditClick = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleDeleteClick = (recipe) => {
    setRecipeToDelete(recipe);
    setDeleteConfirmOpen(true);
  };

  const handleSave = (updatedRecipe) => {
    axios.put(`http://localhost:3001/recipes/${updatedRecipe.id}`, updatedRecipe)
      .then(() => {
        setRecipes(prev => prev.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
        setSnackMessage('Recipe updated successfully!');
        setSnackSeverity('success');
        setSnackOpen(true);
        setModalOpen(false);
      })
      .catch(err => {
        console.error(err);
        setSnackMessage('Failed to update recipe.');
        setSnackSeverity('error');
        setSnackOpen(true);
      });
  };
  
  const confirmDelete = () => {
    if (!recipeToDelete) return;
    axios.delete(`http://localhost:3001/recipes/${recipeToDelete.id}`)
      .then(() => {
        setRecipes(prev => prev.filter(r => r.id !== recipeToDelete.id));
        setSnackMessage('Recipe deleted successfully!');
        setSnackSeverity('info');
        setSnackOpen(true);
        setRecipeToDelete(null);
        setDeleteConfirmOpen(false);
      })
      .catch(err => {
        console.error(err);
        setSnackMessage('Failed to delete recipe.');
        setSnackSeverity('error');
        setSnackOpen(true);
      });
  };
  
  return (
    <>
      <Grid container spacing={3}>
        {recipes.map(recipe => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <RecipeCard
              recipe={recipe}
              onEdit={() => handleEditClick(recipe)}
              onDelete={() => handleDeleteClick(recipe)}
            />
          </Grid>
        ))}
      </Grid>

      <EditRecipeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        recipe={selectedRecipe}
      />

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>
          Are you sure you want to delete "{recipeToDelete?.title}"?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          sx={{ width: '100%' }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>

    </>
  );
}

export default Home;
