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
    <Box sx={{ display: "flex", height: "100vh" }}>
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
          height: 56,
          bgcolor: "#fff",
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
        <Typography variant="h6" color="inherit" sx={{ ml: 2 }}>
          {currentPageLabel}
        </Typography>
      </Box>

      {/* Page Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8, // To offset AppBar height
          width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
          transition: "all ease-in-out 2s",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
