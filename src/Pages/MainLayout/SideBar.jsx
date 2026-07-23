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

// ==========================================
// 2. Main Sidebar Component
// ==========================================
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

  const renderDrawerContent = (isMobile) => (
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
          <MenuItem
            key={index}
            item={item}
            isMobile={isMobile}
            isCollapsed={isCollapsed}
            themeContext={themeContext}
            navigate={navigate}
            location={location}
            handleDrawerToggle={handleDrawerToggle}
          />
        ))}
      </List>

      <Box
        sx={{
          borderTop: `0.7px solid ${themeContext.primary}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ToggleButton
          isCollapsed={isCollapsed}
          onClick={handleCollapseToggle}
          tooltipLabel={isCollapsed ? "Expand" : "Collapse"}
          themeContext={themeContext}
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
            themeContext.mode === "dark" ? "Light Mode" : "Dark Mode"
          }
          isCollapsed={isCollapsed}
          onClick={toggleTheme}
          themeContext={themeContext}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isCollapsed ? 0 : 1,
              justifyContent: "center",
            }}
          >
            {themeContext.mode === "dark" ? <LightMode /> : <NightsStay />}
          </ListItemIcon>
          {!isCollapsed && (
            <ListItemText
              primary={`${themeContext.mode === "dark" ? "Light" : "Dark"}`}
              sx={{ margin: 0 }}
            />
          )}
        </ToggleButton>
      </Box>
    </Box>
  );

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
        ModalProps={{ keepMounted: true, sx: { height: "fit-content" } }}
        sx={{
          border: `0.5px solid ${themeContext.borderColor}`,
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth, height: "fit-content" },
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
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          {renderDrawerContent(true)}
        </Box>
      </Drawer>

      {/* Desktop Permanent Drawer */}
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
            borderRadius: `0 15px 15px 0px;`,
            backgroundColor: themeContext.surface,
            border: `0.5px solid ${themeContext.borderColor}`,
          },
        }}
      >
        {renderDrawerContent(false)}
      </Drawer>
    </Box>
  );
}

// ==========================================
// 1. Standalone Helper Components (Moved Out)
// ==========================================

const ToggleButton = memo(
  ({ isCollapsed, onClick, children, tooltipLabel, themeContext }) => {
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
  }
);
ToggleButton.displayName = "ToggleButton";

const NavItemButton = memo(
  ({
    isSelected,
    onClick,
    children,
    isCollapsed,
    tooltipLabel,
    level,
    themeContext,
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
  }
);
NavItemButton.displayName = "NavItemButton";

const MenuItem = memo(
  ({
    item,
    isMobile,
    isCollapsed,
    level = 0,
    themeContext,
    navigate,
    location,
    handleDrawerToggle,
  }) => {
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
          setOpen((prev) => !prev);
        } else {
          setAnchorEl(event.currentTarget);
        }
      } else {
        navigate(item.path);
        if (isMobile) handleDrawerToggle();
      }
    };

    const handleChildClick = (path) => {
      navigate(path);
      setAnchorEl(null);
      if (isMobile) handleDrawerToggle();
    };

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
        <NavItemButton
          isSelected={isSelected}
          isCollapsed={isCollapsed}
          tooltipLabel={item.label}
          onClick={handleNavigation}
          level={level}
          themeContext={themeContext}
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
            <>
              <ListItemText primary={item.label} sx={{ margin: 0 }} />
              {isParent && (open ? <ExpandLess /> : <ExpandMore />)}
            </>
          )}
        </NavItemButton>

        {/* Expanded Collapse Menu */}
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
                  level={level + 1}
                  themeContext={themeContext}
                  navigate={navigate}
                  location={location}
                  handleDrawerToggle={handleDrawerToggle}
                />
              ))}
            </List>
          </Collapse>
        )}

        {/* Floating Popover Menu */}
        {isParent && isCollapsed && (
          <Popover
            disableAutoFocus
            disableEnforceFocus
            disableRestoreFocus
            id="popover-menu"
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: themeContext.surface,
                  borderRadius: 2,
                  boxShadow: `0 4px 12px rgba(0, 0, 0, 0.2)`,
                  marginLeft: "8px",
                  minWidth: "150px",
                  maxWidth: "300px",
                  padding: "3px",
                },
              },
            }}
          >
            {item.children.map((child, index) => (
              <NavItemButton
                key={index}
                isSelected={location.pathname === child.path}
                onClick={() => handleChildClick(child.path)}
                isCollapsed={false}
                tooltipLabel={child.label}
                level={0}
                themeContext={themeContext}
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
  }
);
MenuItem.displayName = "MenuItem";

export default memo(Sidebar);
