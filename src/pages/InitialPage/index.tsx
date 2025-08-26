import { PAGES } from "../../const/PAGES";
import { usePagesContext } from "../../hooks/usePagesContext";
import cls from "./styles.module.scss";

export const InitialPage = () => {
  const { setCurrentPage } = usePagesContext();

  const singlePlayerHandle = () => {
    setCurrentPage(PAGES.GAME_PAGE);
  };

  return (
    <div className={cls.startContainer}>
      <h1>Start game</h1>
      <button onClick={singlePlayerHandle}>Single player</button>
      <button>Battle with bot</button>
      <button>AI powered</button>
    </div>
  );
};
