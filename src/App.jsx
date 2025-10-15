import { Routes, Route } from "react-router-dom";

// Pages
import Layout from "./Pages/MainLayout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Settings from "./Pages/Settings/Settings";

import { useThemeContext } from "./Hooks/ThemeContext";
import { useEffect } from "react";

function App() {
  const { themeContext, toggleTheme } = useThemeContext();

  useEffect(() => {
    if (document) {
      document.documentElement.style.background = themeContext.background;
      document.documentElement.style.backgroundColor = themeContext.background;
      document.body.style.background = themeContext.background;
      document.body.style.backgroundColor = themeContext.background;
      document.body.style.color = themeContext.subTitleText;

      document.documentElement.style.setProperty(
        "--background-color",
        themeContext.background
      );
      document.documentElement.style.setProperty(
        "--theme-color",
        themeContext.primary
      );
    }
  }, [themeContext]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
