import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// import Link from "@mui/material/Link";
import { mainListItems } from "../routes-nav/NavBar";
import ClientList from "../clients/ClientList";
import PurchaseList from "../purchases/PurchaseList";
import FoodList from "../food/FoodList";

import UserContext from "../auth/UserContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="https://mui.com/">
        Pantry
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const pantryTheme = createTheme();

function Dashboard({ food }) {
  const lowInv = food.filter((element) => element.inventory < 50);

  console.log(lowInv);

  const { currentUser } = useContext(UserContext);

  return (
    <ThemeProvider theme={pantryTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Typography
                    sx={{ textAlign: "center" }}
                    component="h1"
                    variant="h4"
                  >
                    St. Patrick's Food Pantry!
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center", mt: 3 }}
                    component="h5"
                    variant="h5"
                  >
                    Welcome Back,
                    {" " + currentUser.firstName + " " + currentUser.lastName}
                  </Typography>
                </Paper>
              </Grid>
              {/* Recent Purchase Orders */}
              {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <PurchaseList />
                </Paper>
              </Grid> */}
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontSize: "1.2rem", textAlign: "center" }}>
                    Items low in inventory:
                  </Typography>
                  <FoodList food={lowInv} />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
