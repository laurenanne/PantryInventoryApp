import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import PantryApi from "../pantryApi";

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

const pantryTheme = createTheme();

function NewFoodForm({ addNewFood }) {
  const initialState = {
    name: "",
    inventory: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    let food = await addNewFood({
      name: formData.name,
      inventory: parseInt(formData.inventory),
    });

    if (food) {
      history.push("/home");
    } else {
      setFormErrors(food.err);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  //   function isError(formErrors) {
  //     if (!formErrors) return null;
  //     else {
  //       return formErrors.map((e) => ({ e }));
  //     }
  //   }

  return (
    <ThemeProvider theme={pantryTheme}>
      <Container component="main" maxWidth="xs">
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
          <Typography component="h1" variant="h5">
            Add a New Food
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="inventory"
              label="Inventory"
              type="number"
              id="inventory"
              onChange={handleChange}
              value={formData.inventory}
              autoComplete="inventory"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default NewFoodForm;
