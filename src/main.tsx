import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { PagesContextProvider } from "./context/PagesContextProvider";
import { GameContextProvider } from "./context/GameContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PagesContextProvider>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </PagesContextProvider>
  </StrictMode>
);
