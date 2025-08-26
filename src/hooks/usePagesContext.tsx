import { useContext } from "react";
import { PagesContext } from "../context/PagesContext";

export const usePagesContext = () => {
  const context = useContext(PagesContext);

  return context;
};
