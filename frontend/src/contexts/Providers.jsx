import { ToastrProvider } from "./ToastrContext";
import { RecipesProvider } from "./RecipesContext";
import { ModalProvider } from "./ModalContext";

export default function Providers({ children }) {
  return (
    <ToastrProvider>
      <RecipesProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </RecipesProvider>
    </ToastrProvider>
  );
}