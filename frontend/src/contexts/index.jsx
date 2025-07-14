import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";

import { ToastrProvider } from "./ToastrContext";
import { RecipesProvider } from "./RecipesContext";
import { ModalProvider } from "./ModalContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastrProvider>
        <RecipesProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </RecipesProvider>
      </ToastrProvider>
    </ThemeProvider>
  );
}