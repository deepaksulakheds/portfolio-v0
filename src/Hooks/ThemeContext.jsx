import { createContext, useContext, useState, useEffect } from "react";
import { themeOptions } from "./themeOptions.js";

// Create the context
const ThemeContext = createContext();

// Provider
export const ThemeContextProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("dark");

  const theme = themeOptions[themeName];

  const toggleTheme = () => {
    console.log("theme toggled");
    const newTheme = themeName === "light" ? "dark" : "light";
    setThemeName(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeName);
  }, [themeName]);

  return (
    <ThemeContext.Provider
      value={{ themeName, themeContext: theme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook
export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    console.error("useThemeContext must be used within a ThemeContextProvider");
  }
  return ctx;
};

// Optional HOC
export const withThemeContext = (Component) => {
  return function WrappedComponent(props) {
    const themeToggle = useThemeContext();
    return <Component {...props} themeToggle={themeToggle} />;
  };
};
