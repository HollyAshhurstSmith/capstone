import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";

const ConfirmDeleteDialog = ({ open, onClose, onConfirm, recipeTitle }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Are you sure you want to delete "{recipeTitle}"?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
