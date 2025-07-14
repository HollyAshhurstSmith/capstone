import { createRoot } from "react-dom/client";
import AppRouter from "./router/AppRouter";
import Providers from "./contexts";

createRoot(document.getElementById("root")).render(
  <Providers>
    <AppRouter />
  </Providers>
);