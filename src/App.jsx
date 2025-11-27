import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { lazy, Suspense, useEffect } from "react";
import { useThemeContext } from "./Hooks/ThemeContext";
import { Box, CircularProgress } from "@mui/material";

// Pages (lazy-loaded)
const Layout = lazy(() => import("./Pages/MainLayout/Layout"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));
const AboutComponent = lazy(() =>
  import("./Pages/AboutComponent/AboutComponent")
);
const ExperienceComponent = lazy(() =>
  import("./Pages/ExperienceComponent/ExperienceComponent")
);
const ProjectsComponent = lazy(() =>
  import("./Pages/Projects/ProjectsComponent.jsx")
);
const ResumeComponent = lazy(() => import("./Pages/Resume/Resume.jsx"));
const NotesComponent = lazy(() => import("./Pages/Notes/NotesComponent.jsx"));

function App() {
  const { themeContext } = useThemeContext();

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

  // Suspense fallback
  const fallback = (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: themeContext.background || "#fff",
      }}
    >
      <CircularProgress disableShrink sx={{ color: themeContext.primary }} />
    </Box>
  );

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <Suspense fallback={fallback}>
            <Layout />
          </Suspense>
        ),
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={fallback}>
                <AboutComponent />
              </Suspense>
            ),
          },
          {
            path: "/experience",
            element: (
              <Suspense fallback={fallback}>
                <ExperienceComponent />
              </Suspense>
            ),
          },
          {
            path: "/projects",
            element: (
              <Suspense fallback={fallback}>
                <ProjectsComponent />
              </Suspense>
            ),
          },
          {
            path: "/resume",
            element: (
              <Suspense fallback={fallback}>
                <ResumeComponent />
              </Suspense>
            ),
          },
          {
            path: "/notes",
            element: (
              <Suspense fallback={fallback}>
                <ProtectedRoute
                  fallback={<NotFound />}
                  element={<NotesComponent />}
                />
              </Suspense>
            ),
          },
          {
            path: "/*",
            element: (
              <Suspense fallback={fallback}>
                <NotFound />
              </Suspense>
            ),
          },
        ],
      },
      // Cache all routes
      {
        path: "/*/*",
        element: (
          <Suspense fallback={fallback}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
    {
      basename: import.meta.env.VITE_APP_BASE_URL,
    }
  );

  return <RouterProvider router={router} />;
}

export default App;
