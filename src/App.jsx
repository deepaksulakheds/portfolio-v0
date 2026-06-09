import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { lazy, Suspense, useEffect } from "react";
import { useThemeContext } from "./Hooks/ThemeContext";
import { Box, CircularProgress } from "@mui/material";

// Pages (lazy-loaded)
const Layout = lazy(() => import("./Pages/MainLayout/Layout"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));
const AboutComponent = lazy(
  () => import("./Pages/AboutComponent/AboutComponent")
);
const ExperienceComponent = lazy(
  () => import("./Pages/ExperienceComponent/ExperienceComponent")
);
const ProjectsComponent = lazy(
  () => import("./Pages/Projects/ProjectsComponent.jsx")
);
const ResumeComponent = lazy(() => import("./Pages/Resume/Resume.jsx"));
const NotesComponent = lazy(() => import("./Pages/Notes/NotesComponent.jsx"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,

      children: [
        {
          index: true,
          element: <AboutComponent />,
        },
        {
          path: "experience",
          element: <ExperienceComponent />,
        },
        {
          path: "projects",
          element: <ProjectsComponent />,
        },
        {
          path: "resume",
          element: <ResumeComponent />,
        },
        {
          path: "notes",
          element: (
            <ProtectedRoute
              fallback={<NotFound />}
              element={<NotesComponent />}
            />
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    basename: import.meta.env.VITE_APP_BASE_URL || "/",
  }
);

function Loader() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--background-color)",
      }}
    >
      <CircularProgress
        disableShrink
        sx={{
          color: "var(--theme-color)",
        }}
      />
    </Box>
  );
}

function App() {
  const { themeContext } = useThemeContext();

  useEffect(() => {
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
  }, [themeContext]);

  return (
    <Suspense fallback={<Loader themeContext={themeContext} />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
