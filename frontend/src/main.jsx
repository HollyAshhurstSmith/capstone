import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastrProvider } from "./contexts/ToastrContext";
import { RecipesProvider } from "./contexts/RecipesContext";
import { ModalProvider } from "./contexts/ModalContext"; //covers both modal and delete contexts

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <ToastrProvider>
    <RecipesProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </RecipesProvider>
  </ToastrProvider>
</React.StrictMode>

);



// A development-only wrapper that helps you find potential issues in your code.
// Wraps the whole app with the toastr context, giving all components access to toast messages.