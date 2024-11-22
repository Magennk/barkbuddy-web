import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import "../css/Header.css";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // State for logout dialog
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  // Handle menu click
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle logout confirmation dialog open/close
  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutDialogClose = (confirm) => {
    if (confirm) {
      console.log("User logged out"); // Replace with actual logout logic
    }
    setLogoutDialogOpen(false);
  };

  // Check if the button matches the current active page
  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static" className="app-bar">
      {/* Header Part A */}
      <Toolbar className="part-a">
        <Typography variant="h6" className="logo">
          BarkBuddy
        </Typography>
        <Box className="icons-container">
          <Tooltip title="My Profile">
            <IconButton
              component={Link}
              to="/my-profile"
              color={isActive("/my-profile") ? "secondary" : "inherit"}
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="My Buddies">
            <IconButton
              component={Link}
              to="/my-buddies"
              color={isActive("/my-buddies") ? "secondary" : "inherit"}
            >
              <GroupIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton
              color="inherit"
              className="logout-icon"
              onClick={handleLogoutDialogOpen} // Open logout confirmation dialog
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>

      {/* Header Part B */}
      <Toolbar className="part-b">
        {isMobile ? (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box className="buttons-container">
            {[
              // List of navigation paths
              "/",
              "/meet-buddies",
              "/my-profile",
              "/my-buddies",
              "/my-meetings",
              "/my-chat",
            ].map((path, index) => (
              <Button
                key={index}
                component={Link}
                to={path}
                className={`nav-button ${isActive(path) ? "active" : ""}`}
              >
                {path.replace("/", "").replace("-", " ").toUpperCase() ||
                  "HOMEPAGE"}
              </Button>
            ))}
          </Box>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {[
            // List of navigation paths in mobile menu
            "/",
            "/meet-buddies",
            "/my-profile",
            "/my-buddies",
            "/my-meetings",
            "/my-chat",
          ].map((path, index) => (
            <MenuItem
              key={index}
              component={Link}
              to={path}
              onClick={handleMenuClose}
            >
              {path.replace("/", "").replace("-", " ").toUpperCase() ||
                "HOMEPAGE"}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => handleLogoutDialogClose(false)}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to log out?</DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleLogoutDialogClose(false)}
            className="dialog-no"
          >
            No
          </Button>
          <Button
            onClick={() => handleLogoutDialogClose(true)}
            className="dialog-yes"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default Header;
