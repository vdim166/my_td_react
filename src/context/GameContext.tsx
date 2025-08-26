import { createContext } from "react";
import { GAME_TOOLS } from "../const/GAME_TOOLS";
import type { TowerType } from "../pages/GameInstance";

export type GameContextType = {
  selectedTool: React.RefObject<keyof typeof GAME_TOOLS | null>;
  towers: React.RefObject<TowerType[]>;
};

const init: GameContextType = {
  selectedTool: { current: null },
  towers: { current: [] },
};

export const GameContext = createContext<GameContextType>(init);
