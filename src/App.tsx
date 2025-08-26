import { useMemo } from "react";
import { usePagesContext } from "./hooks/usePagesContext";
import { InitialPage } from "./pages/InitialPage";
import { PAGES } from "./const/PAGES";
import { GameInstance } from "./pages/GameInstance";
// import cls from "./App.module.scss";

export const App = () => {
  const { currentPage } = usePagesContext();

  const calcPage = useMemo(() => {
    if (currentPage === PAGES.INIT_PAGE) {
      return <InitialPage />;
    } else if (currentPage === PAGES.GAME_PAGE) {
      return <GameInstance />;
    }
  }, [currentPage]);

  return <div>{calcPage}</div>;
};
