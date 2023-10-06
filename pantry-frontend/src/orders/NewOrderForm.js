import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import NewOrderItemForm from "./NewOrderItemForm";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Pantry
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function NewOrderForm(props) {
  const { clientId } = useParams();
  const { orderId } = useParams();
  const food = props.food;
  const updateInv = props.updateInv;
  const [disabled, setDisabled] = useState(false);
  const [total, setTotal] = useState(0);
  const history = useHistory();
  const pantryTheme = createTheme();

  async function handleSubmit(event) {
    event.preventDefault();
    if (total > 12) {
      setDisabled(true);
      console.log("MESSAGE");
    } else {
      console.log("I'M HERE");
      history.push(`/clients/${clientId}`);
    }
  }

  return (
    <ThemeProvider theme={pantryTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <span className="material-symbols-outlined">nutrition</span>
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
            Pantry Menu
          </Typography>
          <Typography component="h2" sx={{ textAlign: "center" }}>
            {/* {date} */}
          </Typography>
          <Typography
            component="h3"
            sx={{ textAlign: "center", fontSize: ".9rem", mb: 3 }}
          >
            Clients can choose up to 12 items. Limit of 2 per item, except where
            noted.
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            {food.map((f) => (
              <NewOrderItemForm
                key={f.foodId}
                orderId={orderId}
                foodId={f.foodId}
                name={f.name}
                inventory={f.inventory}
                total={total}
                setTotal={setTotal}
                updateInv={updateInv}
              />
            ))}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography>Item Total:</Typography>
              <Typography sx={{ ml: 2, mr: 3 }}> {total} </Typography>
            </Box>
            <Button
              onClick={handleSubmit}
              disabled={disabled}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default NewOrderForm;
