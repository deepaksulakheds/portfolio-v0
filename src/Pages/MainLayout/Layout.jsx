import { useEffect, useMemo, useState } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./SideBar.jsx";
import { useThemeContext } from "../../Hooks/ThemeContext.jsx";
import Header from "../Header/Header.jsx";
import { Person, Settings, WorkHistory } from "@mui/icons-material";
import { useNavigationMenusContext } from "../../Hooks/NavMenuContext.jsx";

const drawerWidth = 180;
const collapsedWidth = 64;

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Contexts
  const { themeContext } = useThemeContext();
  const { navigationMenus } = useNavigationMenusContext();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  const currentDrawerWidth = useMemo(
    () => (isCollapsed ? collapsedWidth : drawerWidth),
    [isCollapsed]
  );

  const currentPage = navigationMenus.find(
    (item) => item.path === location.pathname
  );
  const currentPageLabel = currentPage ? currentPage.label : "";

  useEffect(() => {
    document.title = `${currentPageLabel} | Deepak Sulakhe`;
  }, [currentPageLabel]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsCollapsed(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        transition: "all ease-in-out 0.2s",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        navigationMenus={navigationMenus}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isCollapsed={isCollapsed}
        drawerWidth={currentDrawerWidth}
        handleCollapseToggle={handleCollapseToggle}
      />

      {/* Floating header for small screens */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          margin: "10px",
          borderRadius: 2,
          height: 56,
          bgcolor: themeContext.surface,
          color: "#000",
          display: { xs: "flex", sm: "none" },
          alignItems: "center",
          px: 2,
          zIndex: (theme) => theme.zIndex.appBar + 2,
          boxShadow: 3,
        }}
      >
        <IconButton
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ color: themeContext.navItemTextColor }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          sx={{ ml: 2, fontWeight: "600", color: themeContext.titleText }}
        >
          {currentPageLabel}
        </Typography>
      </Box>

      {/* Page Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 2,
          mt: { xs: 8, sm: 0 },
          width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
          transition: "all ease-in-out 0.2s",
          height: "fit-content",
        }}
      >
        <Header />
        <Grid sx={{ padding: "20px" }}>
          <Outlet />
        </Grid>
      </Box>
    </Box>
  );
}

export default Layout;
