import { useRef } from "react";
import { GameContext, type GameContextType } from "./GameContext";
import { GAME_TOOLS } from "../const/GAME_TOOLS";
import type { TowerType } from "../pages/GameInstance";

type GameContextProviderProps = {
  children: React.ReactNode;
};

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const selectedTool = useRef<keyof typeof GAME_TOOLS | null>(null);
  const towers = useRef<TowerType[]>([]);

  const value: GameContextType = { selectedTool, towers };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
