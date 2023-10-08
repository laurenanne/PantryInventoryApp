import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FoodList from "../food/FoodList";
import UserContext from "../auth/UserContext";

function Dashboard({ food }) {
  const lowInv = food.filter((element) => element.inventory < 50);

  const { currentUser } = useContext(UserContext);

  return (
    <Box sx={{ display: "flex" }}>
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

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: "1.2rem", textAlign: "center" }}>
                  Items low in inventory:
                </Typography>
                <FoodList food={lowInv} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;
