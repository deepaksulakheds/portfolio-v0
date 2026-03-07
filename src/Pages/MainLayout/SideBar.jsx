import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Box,
  Tooltip,
  Grid,
  Collapse,
  Popover,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  NightsStay,
  LightMode,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "../../Hooks/ThemeContext.jsx";
import { memo, useState } from "react";

function Sidebar({
  navigationMenus,
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
    // ... (ToggleButton implementation remains the same)
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
            // padding: "5px 10px",
            cursor: "pointer",
            margin: "8px",
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
    level,
  }) => {
    // ... (NavItemButton implementation remains the same)
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
            marginLeft: `${level * 10}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "flex-start",
            padding: "5px",
            transition: "all ease-in-out 0.3s",
            cursor: "pointer",
            width: level > 0 ? "calc(100% - 10px)" : "100%",
            textOverflow: "ellipsis",
            borderRadius: 2,
            // backgroundColor: isSelected
            //   ? themeContext.selectedNavBackgroundColor
            //   : null,
            borderLeft: isSelected
              ? `4px solid ${themeContext.primary}`
              : "none",
            "& *": {
              filter:
                isSelected && `drop-shadow(0 0 0.4px ${themeContext.primary})`,
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

  const MenuItem = ({ item, isMobile, isCollapsed, level = 0 }) => {
    const isParent = item.children && item.children.length > 0;
    const [open, setOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const isActiveParent =
      isParent &&
      item.children.some((child) => location.pathname.startsWith(child.path));
    const isSelected = location.pathname === item.path || isActiveParent;

    const handleNavigation = (event) => {
      if (isParent) {
        if (!isCollapsed) {
          setOpen(!open);
        } else {
          setAnchorEl(event.currentTarget);
        }
      } else {
        navigate(item.path);
        if (isMobile) {
          handleDrawerToggle();
        }
      }
    };

    const handleChildClick = (path) => {
      navigate(path);
      setAnchorEl(null);
      if (isMobile) {
        handleDrawerToggle();
      }
    };

    // Style adjustment for child menus (indentation)
    // const paddingLeft = isCollapsed ? 0 : 2 + 2 * level;

    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Parent / Standalone Item Button */}
        <NavItemButton
          isSelected={isSelected}
          isCollapsed={isCollapsed}
          tooltipLabel={item.label}
          onClick={handleNavigation}
          level={level}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isCollapsed ? 0 : "5px",
              justifyContent: "center",
              cursor: "pointer",
              // paddingLeft: `${paddingLeft}px`,
            }}
          >
            {item.icon}
          </ListItemIcon>
          {!isCollapsed && (
            <>
              <ListItemText
                primary={item.label}
                sx={{
                  margin: 0,
                }}
              />
              {isParent && (open ? <ExpandLess /> : <ExpandMore />)}
            </>
          )}
        </NavItemButton>

        {/* ========================================================= */}
        {/* Expanded State: Internal Collapse (Normal Behavior) */}
        {/* ========================================================= */}
        {isParent && !isCollapsed && (
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: 1,
            }}
          >
            <List
              component="div"
              disablePadding
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {item.children.map((child, index) => (
                <MenuItem
                  key={index}
                  item={child}
                  isMobile={isMobile}
                  isCollapsed={isCollapsed}
                  level={level + 1} // Increase level for indentation
                />
              ))}
            </List>
          </Collapse>
        )}

        {/* ========================================================= */}
        {/* Collapsed State: Floating Menu (User Request) */}
        {/* ========================================================= */}
        {isParent && isCollapsed && (
          <Popover
            disableAutoFocus
            disableEnforceFocus
            disableRestoreFocus
            id="popover-menu"
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: themeContext.surface,
                  borderRadius: 2,
                  boxShadow: `0 4px 12px rgba(0, 0, 0, 0.2)`,
                  marginLeft: "8px",
                  minWidth: "150px",
                  maxWidth: "300px",
                  maxHeight: "auto",
                  padding: "3px",
                },
              },
            }}
          >
            {/* Render the children inside the floating menu */}
            {item.children.map((child, index) => (
              <NavItemButton
                key={index}
                isSelected={location.pathname === child.path}
                onClick={() => handleChildClick(child.path)}
                isCollapsed={false}
                tooltipLabel={child.label}
                level={0}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                  {child.icon}
                </ListItemIcon>
                <ListItemText primary={child.label} />
              </NavItemButton>
            ))}
          </Popover>
        )}
      </Box>
    );
  };

  const DrawerContent = (isMobile, navigationMenus) => {
    return (
      <Box
        sx={{
          width: drawerWidth,
          height: "calc(100% - 20px)",
          display: "flex",
          paddingTop: "10px",
          paddingBottom: "10px",
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
            padding: "5px",
          }}
        >
          {navigationMenus.map((item, index) => (
            // Use the new MenuItem component
            <MenuItem
              key={index}
              item={item}
              isMobile={isMobile}
              isCollapsed={isCollapsed}
            />
          ))}
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
                mr: isCollapsed ? 0 : 1,
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
                mr: isCollapsed ? 0 : 1,
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
        marginRight: { xs: 0, sm: "10px" },
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
          {DrawerContent(true, navigationMenus)} {/* Mobile Drawer */}
        </Box>
      </Drawer>

      {/* Desktop Permanent Drawer with floating style */}
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
            height: `100%`,
            // margin: "7px",
            borderRadius: `0 7px 7px 0px;`,
            // boxShadow: "0 8px 16px rgba(255, 254, 254, 0.15)",
            backgroundColor: themeContext.surface,
            border: `none`,
          },
        }}
      >
        {DrawerContent(false, navigationMenus)} {/* Desktop Navbar */}
      </Drawer>
    </Box>
  );
}

export default memo(Sidebar);
