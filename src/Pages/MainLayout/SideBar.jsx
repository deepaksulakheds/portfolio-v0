// Sidebar.jsx
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Tooltip,
  Grid,
} from "@mui/material";
import {
  Dashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  NightsStay,
  LightMode,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "../../Hooks/ThemeContext.jsx";

const localMenu = [
  { label: "Dashboard", path: "/", icon: <Dashboard /> },
  { label: "Settings", path: "/settings", icon: <Settings /> },
];

function Sidebar({
  mobileOpen,
  handleDrawerToggle,
  isCollapsed,
  drawerWidth,
  handleCollapseToggle,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const { themeContext, toggleTheme } = useThemeContext();

  const DrawerContent = (isMobile) => {
    return (
      <Box
        sx={{
          width: drawerWidth,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top Menu */}
        <List
          sx={{
            overflow: "auto",
            display: "flex",
            gap: `10px`,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {localMenu.map((item, index) => {
            const isSelected = location.pathname === item.path;
            return (
              <Tooltip
                title={isCollapsed ? item.label : ""}
                placement="right"
                key={index}
                arrow
                slotProps={{
                  tooltip: {
                    sx: {
                      color: themeContext.oppositeTheme,
                      backgroundColor: themeContext.themeColor,
                    },
                  },
                  arrow: {
                    sx: {
                      color: themeContext.themeColor,
                    },
                  },
                }}
              >
                <Grid
                  selected={isSelected}
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) {
                      handleDrawerToggle();
                    }
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isCollapsed ? "center" : "flex-start",
                    padding: "5px 10px",
                    cursor: "pointer",
                    width: "80%",
                    borderRadius: 2,
                    backgroundColor: isSelected
                      ? themeContext.themeColor
                      : null,
                    color: isSelected
                      ? themeContext.themeColor
                      : themeContext.oppositeTheme,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isCollapsed ? 0 : "5px",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: isSelected
                        ? themeContext.oppositeTheme
                        : themeContext.navbarListItem,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!isCollapsed && (
                    <ListItemText
                      primary={item.label}
                      sx={{
                        margin: 0,
                        color: isSelected
                          ? themeContext.oppositeTheme
                          : themeContext.navbarListItem,
                      }}
                    />
                  )}
                </Grid>
              </Tooltip>
            );
          })}
        </List>

        {/* Bottom Collapse Toggle */}
        {/* <Divider /> */}
        <Box
          sx={{
            borderTop: `0.5px solid gray`,
          }}
        >
          <ListItemButton
            onClick={handleCollapseToggle}
            sx={{
              justifyContent: isCollapsed ? "center" : "flex-start",
              px: isCollapsed ? 2 : 3,
              mt: 1,
              margin: 0,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? 0 : 2,
                justifyContent: "center",
                color: themeContext.navbarListItem,
              }}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </ListItemIcon>
            {!isCollapsed && (
              <ListItemText
                primary="Collapse"
                sx={{ color: themeContext.navbarListItem, margin: 0 }}
              />
            )}
          </ListItemButton>
          <ListItemButton
            onClick={toggleTheme}
            sx={{
              justifyContent: isCollapsed ? "center" : "flex-start",
              px: isCollapsed ? 2 : 3,
              mt: 1,
              margin: 0,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? 0 : 2,
                justifyContent: "center",
                color: themeContext.navbarListItem,
              }}
            >
              {themeContext.mode == "dark" ? <LightMode /> : <NightsStay />}
            </ListItemIcon>
            {!isCollapsed && (
              <ListItemText
                primary={`${
                  themeContext.mode == "dark" ? "Light" : "Dark"
                } Mode`}
                sx={{ color: themeContext.navbarListItem, margin: 0 }}
              />
            )}
          </ListItemButton>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        marginRight: "20px",
      }}
      aria-label="sidebar"
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
          sx: {
            height: "fit-content",
          },
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            height: "fit-content",
            // margin: "12px 0", // For floating style drawer
            // borderRadius: 2,
          },
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: themeContext.navbarBackground,
            },
          },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          {DrawerContent(true)}
        </Box>
      </Drawer>

      {/* Permanent Drawer with floating style */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            transition: "width 0.3s",
            overflowX: "hidden",
            whiteSpace: "nowrap",
            height: `97%`,
            margin: "12px",
            borderRadius: 2,
            // boxShadow: "0 8px 16px rgba(255, 254, 254, 0.15)",
            backgroundColor: themeContext.navbarBackground,
          },
        }}
      >
        {DrawerContent(false)}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
