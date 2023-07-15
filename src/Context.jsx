import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-dark-scheme: dark)"
  ).matches;
  const storedDarkMode = localStorage.getItem("darkTheme") === "true";

  return storedDarkMode || prefersDarkMode;
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchForm, setSearchForm] = useState("office");

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  const toggleDarkTheme = () => {
    const changeDarkTheme = !isDarkTheme;
    setIsDarkTheme(changeDarkTheme);

    const body = document.querySelector("body");
    body.classList.toggle("dark-theme", isDarkTheme);

    localStorage.setItem("darkTheme", changeDarkTheme);
  };

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchForm, setSearchForm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
