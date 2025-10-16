import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Pages
const AboutComponent = lazy(() =>
  import("./Pages/AboutComponent/AboutComponent")
);
const Settings = lazy(() => import("./Pages/Settings/Settings"));
const Layout = lazy(() => import("./Pages/MainLayout/Layout"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));

import { useThemeContext } from "./Hooks/ThemeContext";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

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
    <Suspense
      fallback={
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: themeContext.background || "#fff",
          }}
        >
          <CircularProgress
            disableShrink
            sx={{
              color: themeContext.primary,
            }}
          />
        </Box>
      }
    >
      <Routes>
        {/* Main and matching Routes */}
        <Route path="/*" element={<Layout />}>
          <Route index element={<AboutComponent />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Add outside to remove layout also*/}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Suspense>
  );
}

export default App;
