import React, { useState } from "react";
import { useRecipes } from "../contexts/RecipesContext";

export default function RecipeBook() {
  const { filteredRecipes, setSearchTerm } = useRecipes();
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(input); // ✅ Triggers search only on Enter
    }
  };

  const handleSearchClick = () => {
    setSearchTerm(input); // ✅ Optional: click to search
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearchClick}>Search</button>

      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
}
