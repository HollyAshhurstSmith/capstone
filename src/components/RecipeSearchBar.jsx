import React from "react";
import { TextField, Button, Stack } from "@mui/material";

const RecipeSearchBar = ({
  searchInput,
  setSearchInput,
  onSearch,
  onReset,
  onAdd,
}) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ mb: 3, flexWrap: "wrap", justifyContent: "space-between", paddingTop: '64px', }}
    >
      <TextField
        label="Search by title"
        variant="outlined"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
        sx={{ flexGrow: 1, minWidth: "200px" }}
      />

      <Button variant="outlined" onClick={onSearch}>
        Search
      </Button>

      <Button variant="outlined" onClick={onReset}>
        All Recipes
      </Button>

      <Button variant="contained" onClick={onAdd}>
        Add Recipe
      </Button>
    </Stack>
  );
};

export default RecipeSearchBar;
