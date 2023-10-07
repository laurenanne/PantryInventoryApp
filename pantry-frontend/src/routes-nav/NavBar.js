import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";

function NavBar({ logout }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none", lg: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <span className="material-symbols-outlined">menu</span>
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <NavLink style={{ textDecoration: "none" }} to="/clients">
                <MenuItem key="clients" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Clients</Typography>
                </MenuItem>
              </NavLink>

              <NavLink style={{ textDecoration: "none" }} to="/orders">
                <MenuItem key="orders" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Orders</Typography>
                </MenuItem>
              </NavLink>

              <NavLink style={{ textDecoration: "none" }} to="/purchases">
                <MenuItem key="purchases" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Purchases</Typography>
                </MenuItem>
              </NavLink>

              <NavLink style={{ textDecoration: "none" }} to="/food">
                <MenuItem key="food" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Inventory</Typography>
                </MenuItem>
              </NavLink>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex", lg: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            St. Patrick's Pantry
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavLink style={{ textDecoration: "none" }} to="/clients">
              <Button
                key="clients"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Clients
              </Button>
            </NavLink>

            <NavLink style={{ textDecoration: "none" }} to="/orders">
              <Button
                key="orders"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Orders
              </Button>
            </NavLink>

            <NavLink style={{ textDecoration: "none" }} to="/purchases">
              <Button
                key="purchases"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Purchases
              </Button>
            </NavLink>

            <NavLink style={{ textDecoration: "none" }} to="/food">
              <Button
                key="food"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Inventory
              </Button>
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings"> */}
            <NavLink onClick={logout} style={{ textDecoration: "none" }} to="/">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ color: "white" }}
              >
                <span className="material-symbols-outlined">logout</span>
              </IconButton>
            </NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
