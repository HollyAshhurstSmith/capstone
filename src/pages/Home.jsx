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
  TextField,
  Box,
  Stack
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
  const [snackSeverity, setSnackSeverity] = useState('success');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleEditClick = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedRecipe(null); // Clear form for new recipe
    setModalOpen(true);
  };

  const handleDeleteClick = (recipe) => {
    setRecipeToDelete(recipe);
    setDeleteConfirmOpen(true);
  };

  const handleSave = (recipeData) => {
    if (recipeData.id) {
      // Existing recipe → PUT
      axios.put(`http://localhost:3001/recipes/${recipeData.id}`, recipeData)
        .then(() => {
          setRecipes(prev => prev.map(r => r.id === recipeData.id ? recipeData : r));
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
    } else {
      // New recipe → POST
      axios.post(`http://localhost:3001/recipes`, recipeData)
        .then(res => {
          setRecipes(prev => [...prev, res.data]);
          setSnackMessage('Recipe added successfully!');
          setSnackSeverity('success');
          setSnackOpen(true);
          setModalOpen(false);
        })
        .catch(err => {
          console.error(err);
          setSnackMessage('Failed to add recipe.');
          setSnackSeverity('error');
          setSnackOpen(true);
        });
    }
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

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <TextField
          label="Search Recipes"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        <Button variant="contained" sx={{ ml: 2, whiteSpace: 'nowrap' }} onClick={handleAddClick}>
          Add Recipe
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {filteredRecipes.map(recipe => (
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
