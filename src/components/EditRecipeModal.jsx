import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function EditRecipeModal({ open, onClose, onSave, recipe }) {
  const [form, setForm] = useState({
    title: '',
    prepTime: '',
    method: '',
    imageUrl: '',
    ingredients: '',
  });

  useEffect(() => {
    if (recipe) {
      setForm({
        ...recipe,
        ingredients: recipe.ingredients?.join('\n') || '', // convert array to multiline string
      });
    } else {
      setForm({
        title: '',
        prepTime: '',
        method: '',
        imageUrl: '',
        ingredients: '',
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      ingredients: form.ingredients.split('\n').map(i => i.trim()).filter(Boolean),
    };
    if (recipe?.id) {
      payload.id = recipe.id;
    }
    onSave(payload);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{recipe ? 'Edit Recipe' : 'Add Recipe'}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            name="title"
            label="Title"
            value={form.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="prepTime"
            label="Preparation Time"
            value={form.prepTime}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="ingredients"
            label="Ingredients (one per line)"
            value={form.ingredients}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            name="method"
            label="Method"
            value={form.method}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            name="imageUrl"
            label="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditRecipeModal;
