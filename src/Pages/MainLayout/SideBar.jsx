// Sidebar.jsx
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Box,
  Tooltip,
  Grid,
} from "@mui/material";
import {
  Settings,
  ChevronLeft,
  ChevronRight,
  NightsStay,
  LightMode,
  Person,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "../../Hooks/ThemeContext.jsx";

const localMenu = [
  { label: "About", path: "/", icon: <Person /> },
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

  const ToggleButton = ({ isCollapsed, onClick, children, tooltipLabel }) => {
    return (
      <Tooltip
        title={isCollapsed ? tooltipLabel : ""}
        placement="right"
        arrow
        slotProps={{
          tooltip: {
            sx: {
              color: themeContext.colorOnPrimary,
              backgroundColor: themeContext.primary,
            },
          },
          arrow: {
            sx: {
              color: themeContext.primary,
            },
          },
        }}
      >
        <Grid
          onClick={onClick}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "flex-start",
            padding: "5px 10px",
            cursor: "pointer",
            margin: "5px",
            width: "80%",
            borderRadius: 2,
            color: themeContext.navItemTextColor,
            "& *": {
              color: themeContext.navItemTextColor,
            },
            "&:hover *": {
              color: themeContext.primary,
              filter: `drop-shadow(0 0 0.5px ${themeContext.primary})`,
            },
          }}
        >
          {children}
        </Grid>
      </Tooltip>
    );
  };

  const NavItemButton = ({
    isSelected,
    onClick,
    children,
    isCollapsed,
    tooltipLabel,
  }) => {
    return (
      <Tooltip
        title={isCollapsed ? tooltipLabel : ""}
        placement="right"
        arrow
        slotProps={{
          tooltip: {
            sx: {
              color: themeContext.colorOnPrimary,
              backgroundColor: themeContext.primary,
            },
          },
          arrow: {
            sx: {
              color: themeContext.primary,
            },
          },
        }}
      >
        <Grid
          selected={isSelected}
          onClick={onClick}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "flex-start",
            padding: "5px 10px",
            cursor: "pointer",
            width: "80%",
            borderRadius: 2,
            backgroundColor: isSelected
              ? themeContext.selectedNavBackgroundColor
              : null,
            "& *": {
              color: isSelected
                ? themeContext.selectedNavTextColor
                : themeContext.navItemTextColor,
            },
            ...(!isSelected && {
              "&:hover *": {
                color: themeContext.primary,
                filter: `drop-shadow(0 0 0.5px ${themeContext.primary})`,
              },
            }),
          }}
        >
          {children}
        </Grid>
      </Tooltip>
    );
  };

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
              <NavItemButton
                key={index}
                isSelected={isSelected}
                isCollapsed={isCollapsed}
                tooltipLabel={item.label}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) {
                    handleDrawerToggle();
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isCollapsed ? 0 : "5px",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={item.label}
                    sx={{
                      margin: 0,
                    }}
                  />
                )}
              </NavItemButton>
            );
          })}
        </List>

        {/* Bottom Collapse Toggle */}

        <Box
          sx={{
            borderTop: `0.7px solid ${themeContext.primary}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // gap: 2,
          }}
        >
          <ToggleButton
            isCollapsed={isCollapsed}
            onClick={handleCollapseToggle}
            tooltipLabel={isCollapsed ? "Expand" : "Collapse"}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? 0 : 2,
                justifyContent: "center",
              }}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </ListItemIcon>
            {!isCollapsed && (
              <ListItemText primary="Collapse" sx={{ margin: 0 }} />
            )}
          </ToggleButton>
          <ToggleButton
            tooltipLabel={
              themeContext.mode == "dark" ? "Light Mode" : "Dark Mode"
            }
            isCollapsed={isCollapsed}
            onClick={toggleTheme}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? 0 : 2,
                justifyContent: "center",
              }}
            >
              {themeContext.mode == "dark" ? <LightMode /> : <NightsStay />}
            </ListItemIcon>
            {!isCollapsed && (
              <ListItemText
                primary={`${themeContext.mode == "dark" ? "Light" : "Dark"}`}
                sx={{ margin: 0 }}
              />
            )}
          </ToggleButton>
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
        marginRight: { xs: 0, sm: "20px" },
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
              backgroundColor: themeContext.surface,
              borderRadius: `0 10px 10px 0;`,
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
          {DrawerContent(true)} {/* Mobile Drawer */}
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
            backgroundColor: themeContext.surface,
          },
        }}
      >
        {DrawerContent(false)} {/* Desktop Navbar */}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
