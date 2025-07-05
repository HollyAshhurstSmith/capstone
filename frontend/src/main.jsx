import { createRoot } from "react-dom/client";
import AppRouter from "./router/AppRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Providers from "./contexts/Providers";

createRoot(document.getElementById("root")).render(
  <Providers>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  </Providers>
);
