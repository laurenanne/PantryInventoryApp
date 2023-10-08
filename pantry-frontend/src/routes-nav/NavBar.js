import React, { useState, useContext } from "react";
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
import { Avatar, Tooltip } from "@mui/material";
import UserContext from "../auth/UserContext";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
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
              <NavLink style={{ textDecoration: "none" }} to="/home">
                <MenuItem key="home" onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{ color: "secondary.dark" }}
                    textAlign="center"
                  >
                    Home
                  </Typography>
                </MenuItem>
              </NavLink>

              <NavLink style={{ textDecoration: "none" }} to="/clients">
                <MenuItem key="clients" onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{ color: "secondary.dark" }}
                    textAlign="center"
                  >
                    Clients
                  </Typography>
                </MenuItem>
              </NavLink>

              <NavLink style={{ textDecoration: "none" }} to="/orders">
                <MenuItem key="orders" onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{ color: "secondary.dark" }}
                    textAlign="center"
                  >
                    Orders
                  </Typography>
                </MenuItem>
              </NavLink>

              <NavLink style={{ textDecoration: "none" }} to="/purchases">
                <MenuItem key="purchases" onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{ color: "secondary.dark" }}
                    textAlign="center"
                  >
                    Purchases
                  </Typography>
                </MenuItem>
              </NavLink>

              <NavLink style={{ textDecoration: "none" }} to="/food">
                <MenuItem key="food" onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{ color: "secondary.dark" }}
                    textAlign="center"
                  >
                    Inventory
                  </Typography>
                </MenuItem>
              </NavLink>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex", lg: "flex" },
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

            <NavLink style={{ textDecoration: "none" }} to="/home">
              <Button
                key="home"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <NavLink
                onClick={logout}
                style={{ textDecoration: "none" }}
                to="/"
              >
                <MenuItem key="logout" onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{ color: "secondary.dark" }}
                    textAlign="center"
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </NavLink>

              <NavLink
                style={{ textDecoration: "none" }}
                to={`/users/${currentUser.username}/edit`}
              >
                <MenuItem key="user" onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{ color: "secondary.dark" }}
                    textAlign="center"
                  >
                    Profile
                  </Typography>
                </MenuItem>
              </NavLink>

              <NavLink style={{ textDecoration: "none" }} to="/signup">
                <MenuItem key="signup" onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{ color: "secondary.dark" }}
                    textAlign="center"
                  >
                    Create User
                  </Typography>
                </MenuItem>
              </NavLink>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
