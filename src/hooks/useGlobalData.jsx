import { useContext } from "react";
import { globalContext  } from "../context/GlobalProvider";

export function useGlobalData() {
  const context = useContext(globalContext);

  if (context === undefined) {
    throw new Error("useGlobalData() must be used inside a themeProvider");
  }
  return context;
}
