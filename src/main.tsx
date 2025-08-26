import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { PagesContextProvider } from "./context/PagesContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PagesContextProvider>
      <App />
    </PagesContextProvider>
  </StrictMode>
);
