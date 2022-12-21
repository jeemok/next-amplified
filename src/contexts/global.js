import { createContext, useContext, useState } from "react";

const AppContext = createContext(undefined);

export function AppContextProvider({ children }) {
  const [appTheme, setAppTheme] = useState({ colorScheme: "light" });
  return (
    <AppContext.Provider value={{ appTheme, setAppTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context)
    throw new Error("useAppContext must be used inside a `AppProvider`");

  return context;
}
