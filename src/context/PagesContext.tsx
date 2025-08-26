import { createContext } from "react";
import { PAGES } from "../const/PAGES";

export type PagesContextType = {
  currentPage: keyof typeof PAGES;
  setCurrentPage: React.Dispatch<React.SetStateAction<keyof typeof PAGES>>;
};

const init: PagesContextType = {
  currentPage: PAGES.INIT_PAGE,
  setCurrentPage: () => {},
};

export const PagesContext = createContext<PagesContextType>(init);
