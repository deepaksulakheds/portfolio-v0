import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useThemeContext } from "../../Hooks/ThemeContext.jsx";

const drawerWidth = 180;
const collapsedWidth = 64;

const localMenu = [
  { label: "Dashboard", path: "/" },
  { label: "Settings", path: "/settings" },
];

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Contexts
  const { themeContext, toggleTheme } = useThemeContext();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  const currentDrawerWidth = isCollapsed ? collapsedWidth : drawerWidth;

  const currentPage = localMenu.find((item) => item.path === location.pathname);
  const currentPageLabel = currentPage ? currentPage.label : "";

  useEffect(() => {
    setTimeout(() => {
      setIsCollapsed(true);
    }, 2000);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        transition: "all ease-in-out 0.2",
      }}
    >
      {/* Sidebar */}
      <Sidebar
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
          bgcolor: themeContext.navbarBackground,
          color: "#000",
          display: { xs: "flex", sm: "none" },
          alignItems: "center",
          px: 2,
          zIndex: (theme) => theme.zIndex.appBar + 2,
          boxShadow: 3,
        }}
      >
        <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
        <Typography sx={{ ml: 2, fontWeight: "600" }}>
          {currentPageLabel}
        </Typography>
      </Box>

      {/* Page Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          mt: { xs: 8, sm: 0 },
          width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
          transition: "all ease-in-out 0.2s",
          height: "fit-content",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
