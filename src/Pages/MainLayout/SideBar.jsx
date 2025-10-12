// Sidebar.jsx
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

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

  const drawerContent = (
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
            >
              <ListItemButton
                selected={isSelected}
                onClick={() => {
                  navigate(item.path);
                  handleDrawerToggle(); // mobile only
                }}
                sx={{
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  px: isCollapsed ? 2 : 3,
                  cursor: "pointer",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isCollapsed ? 0 : 2,
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
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
            }}
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Collapse" />}
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          {drawerContent}
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
            boxShadow: "0 8px 16px rgba(255, 254, 254, 0.15)",
            backgroundColor: "#fff",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
