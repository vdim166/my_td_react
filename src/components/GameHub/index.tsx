import { GAME_TOOLS } from "../../const/GAME_TOOLS";
import { useGameContext } from "../../hooks/useGameContext";
import cls from "./styles.module.scss";

export const GameHub = () => {
  const { selectedTool } = useGameContext();

  const selectTower = () => {
    selectedTool.current = GAME_TOOLS.BUY_TOWER;
  };

  return (
    <div className={cls.gameHub}>
      <div>
        Buy: <span id="money"></span>$
      </div>

      <div className={cls.buyContainer}>
        <button id="buy-tower" onClick={selectTower}>
          Tower
        </button>
      </div>
    </div>
  );
};
