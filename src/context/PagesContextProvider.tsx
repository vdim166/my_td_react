import { useState } from "react";
import { PagesContext, type PagesContextType } from "./PagesContext";
import { PAGES } from "../const/PAGES";

type PagesContextProvider = {
  children: React.ReactNode;
};

export const PagesContextProvider = ({ children }: PagesContextProvider) => {
  const [currentPage, setCurrentPage] = useState<keyof typeof PAGES>(
    PAGES.INIT_PAGE
  );

  const value: PagesContextType = {
    currentPage,
    setCurrentPage,
  };

  return (
    <PagesContext.Provider value={value}>{children}</PagesContext.Provider>
  );
};
