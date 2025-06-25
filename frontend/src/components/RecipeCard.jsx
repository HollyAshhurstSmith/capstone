import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  CardActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

function RecipeCard({ recipe, onEdit, onDelete }) {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', }}>
      {recipe.imageUrl && (
        <CardMedia
          component="img"
          height="180"
          image={recipe.imageUrl}
          alt={recipe.title}
        />
      )}

    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" component="div" sx={{ mb: 0.5 }}>
        {recipe.title}
      </Typography>

      <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0, textAlign: 'left' }}>
        Prep Time: {recipe.prepTime}
      </Typography>

      <div>
        <Typography variant="body2" sx={{ mt: 1, textAlign: 'left' }}>
              <strong>Ingredients:</strong>
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '1.2em', textAlign: 'left' }}>
      {recipe.ingredients?.map((item, index) => (
        <li key={`${item}-${index}`} style={{ padding: 0, margin: 0 }}>
          {item}
        </li>
      ))}
    </ul>

      </div>

      <Typography variant="body2" sx={{ mt: 1, textAlign: 'left' }}>
        <strong>Method:</strong> {recipe.method}
      </Typography>
    </CardContent>


      <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
        <IconButton onClick={() => onEdit(recipe)} size="small">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(recipe)} size="small">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default RecipeCard;
